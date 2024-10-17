const Course = require("../models/course");

exports.getCourses = async (req, res) => {
  try {
    // Use populate to get the institute name along with the course data
    const courses = await Course.find().populate("institute_id", "institute_name").sort({_id:-1}); // Change "institute_name" to the actual field name in your Institute model

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

exports.postCourses = async (req, res) => {
  try {
    const { courseName,imageUrl, institute_id, studentsEnrolled, totalFee } = req.body;

    const newCourse = new Course({
      courseName,
      imageUrl, 
      institute_id,
      studentsEnrolled,
      totalFee,
    });

    await newCourse.save();

    // Populate the institute_id and course_id after saving the student
    const populatedCourse = await Course.findById(newCourse._id)
    .populate("institute_id")

    res.status(201).json(populatedCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course", error });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, imageUrl, institute_id, studentsEnrolled, totalFee } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        courseName,
        imageUrl,
        institute_id,
        studentsEnrolled,
        totalFee,
      },
      { new: true } // Return the updated document
    ).populate("institute_id", "institute_name"); // Populate the institute name

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course", error });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Error deleting course", error });

}
}

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find the announcement by ID and delete it
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully", deletedCourse });
  } catch (error) {
    console.error('Error deleting announcement:', error); // Log error
    res.status(500).json({ message: "Error deleting announcement", error });
  }
}
