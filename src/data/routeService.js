// src/data/routeService.js
// Firestore CRUD for saved routes

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Save a new route to Firestore.
 * @returns {string} The new route document ID
 */
export async function saveRoute(userId, routeData) {
  const routesRef = collection(db, "users", userId, "routes");

  // Strip internal scoring data before saving
  const stops = (routeData.stops || []).map((stop) => {
    const { _routeScore, ...cleanStop } = stop;
    return cleanStop;
  });

  // Strip internal latLng objects from segments
  const segments = (routeData.segments || []).map((seg) => {
    const { fromLatLng, toLatLng, path, ...cleanSeg } = seg;
    return cleanSeg;
  });

  const routeDoc = {
    name: routeData.name || "Night Out",
    createdAt: serverTimestamp(),
    status: routeData.status || "planned",
    stops,
    preferences: routeData.preferences || {},
    route: {
      segments,
      totalDistance: routeData.totalDistance || "0 miles",
      totalWalkingTime: routeData.totalWalkingTime || "0 min",
      estimatedTotalTime: routeData.estimatedTotalTime || "~0 hours",
    },
    isPublic: false,
    sharedWith: [],
    postId: null,
    stats: {
      stopsCompleted: 0,
      overallRating: null,
    },
  };

  const docRef = await addDoc(routesRef, routeDoc);
  return docRef.id;
}

/** Get a single route by ID */
export async function getRoute(userId, routeId) {
  const routeRef = doc(db, "users", userId, "routes", routeId);
  const snap = await getDoc(routeRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/** Get all routes for a user, optionally filtered by status */
export async function getUserRoutes(userId, status = null) {
  const routesRef = collection(db, "users", userId, "routes");
  let q;
  if (status) {
    q = query(routesRef, where("status", "==", status), orderBy("createdAt", "desc"));
  } else {
    q = query(routesRef, orderBy("createdAt", "desc"));
  }

  try {
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    // Index may not exist yet — fall back to unordered
    const fallbackSnap = await getDocs(routesRef);
    const docs = fallbackSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (status) return docs.filter((d) => d.status === status);
    return docs;
  }
}

/** Update a route's status */
export async function updateRouteStatus(userId, routeId, status) {
  const routeRef = doc(db, "users", userId, "routes", routeId);
  await updateDoc(routeRef, { status });
}

/** Mark a stop as visited */
export async function markStopVisited(userId, routeId, stopOrder) {
  const route = await getRoute(userId, routeId);
  if (!route) return;

  const stops = route.stops.map((s) => {
    if (s.order === stopOrder) {
      return { ...s, arrivedAt: new Date().toISOString(), visitedAt: new Date().toISOString() };
    }
    return s;
  });

  const stopsCompleted = stops.filter((s) => s.visitedAt).length;
  const routeRef = doc(db, "users", userId, "routes", routeId);
  await updateDoc(routeRef, {
    stops,
    "stats.stopsCompleted": stopsCompleted,
    ...(stopsCompleted === stops.length ? { status: "completed" } : {}),
  });
}

/**
 * Complete a route with ratings, notes, and sharing preferences.
 * Called from the post-route completion flow.
 */
export async function completeRoute(userId, routeId, {
  ratings = [],       // [{ stopIndex, rating, notes }]
  routeName,
  visibility = "private", // "private" | "public" | "followers"
}) {
  const route = await getRoute(userId, routeId);
  if (!route) return;

  // Merge ratings into stops
  const stops = (route.stops || []).map((stop, i) => {
    const r = ratings.find((r) => r.stopIndex === i);
    if (r) {
      return { ...stop, rating: r.rating || null, notes: r.notes || "" };
    }
    return stop;
  });

  // Calculate overall rating
  const rated = ratings.filter((r) => r.rating > 0);
  const overallRating = rated.length > 0
    ? Math.round((rated.reduce((sum, r) => sum + r.rating, 0) / rated.length) * 10) / 10
    : null;

  const routeRef = doc(db, "users", userId, "routes", routeId);
  await updateDoc(routeRef, {
    stops,
    status: "completed",
    completedAt: serverTimestamp(),
    name: routeName || route.name || "Night Out",
    isPublic: visibility === "public",
    sharedWith: visibility === "followers" ? "followers" : visibility === "public" ? "all" : null,
    "stats.overallRating": overallRating,
    "stats.stopsCompleted": stops.length,
  });
}

/**
 * Create a "route" post in the feed.
 * Uses the same posts collection but with type: "route".
 */
export async function createRoutePost(userId, routeData) {
  const postsRef = collection(db, "posts");
  const stops = (routeData.stops || []).map((s) => ({
    name: s.place?.name || "Unknown",
    category: s.place?.category || "",
    rating: s.rating || null,
    notes: s.notes || "",
    photoUrl: s.place?.photoUrl || null,
  }));

  const postDoc = {
    authorId: userId,
    type: "route",
    routeName: routeData.name || "Night Out",
    routeId: routeData.id || null,
    stops,
    totalDistance: routeData.route?.totalDistance || "",
    city: "Carlsbad",
    likes: 0,
    commentsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(postsRef, postDoc);

  // Link the post back to the route
  if (routeData.id) {
    const routeRef = doc(db, "users", userId, "routes", routeData.id);
    await updateDoc(routeRef, { postId: docRef.id });
  }

  return docRef.id;
}

/** Delete a route */
export async function deleteRoute(userId, routeId) {
  const routeRef = doc(db, "users", userId, "routes", routeId);
  await deleteDoc(routeRef);
}
