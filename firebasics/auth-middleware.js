import { getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

/**
 * Auth middleware using FirebaseAdmin
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function authMiddleware(req, res, next) {
  const firebase = getApp();
  const auth = getAuth(firebase)
  auth
}
