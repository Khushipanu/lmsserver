
import Course from "../models/courses.model.js";
import TryCatch from "../middlewares/TryCatch.js";
import Query from "../models/query.model.js";

export const createQuery = TryCatch(async (req, res) => {
  const { title, topic, description } = req.body;
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if(course.createdBy.toString() === req.user._id.toString()){
  return res.status(403).json({
    message:"Instructor cannot ask doubt on their own course"
  });
}
  const query = await Query.create({
    title: title,
    topic: topic,
    description: description,
    course: courseId,
    student: req.user._id,
    instructor: course.createdBy,
  });
  res.status(201).json({ message: "Query sent to the instructor", query });
});




//instructor will see the query of their courses only
export const getInstructorQueries = TryCatch(async (req, res) => {

  const queries = await Query.find({
    instructor: req.user._id
  })
 .populate("student","name email")
 .populate("course","title")
  console.log("query",queries);

  res.status(200).json({
    queries
  });

});


//admin click krega to query solve
export const updateQueryStatus = TryCatch(async (req, res) => {

  const { status, reply } = req.body;

  const query = await Query.findById(req.params.id);

  if (!query) {
    return res.status(404).json({
      message: "Query not found",
    });
  }

  if (status) {
    query.status = status;
  }

  if (reply) {
    query.reply = reply;
  }

  await query.save();

  res.status(200).json({
    message: "Query resolved successfully",
    query,
  });

});

export const getStudentQueries = async (req, res) => {

  const queries = await Query.find({
    student:req.user._id
  }).populate("course","title").populate("instructor","name")
  console.log("queries",queries)

  res.json({
    queries
  });
};