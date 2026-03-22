import express from "express";
import { createQuery,getStudentQueries,getInstructorQueries, updateQueryStatus } from "../controllers/query.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// student sends query
router.post("/create/:courseId", isAuth, createQuery);

// instructor views queries
router.get("/instructor", isAuth, getInstructorQueries);

// instructor marks solved
router.put("/status/:id", isAuth, updateQueryStatus);

router.get("/my",isAuth,getStudentQueries);

export default router;