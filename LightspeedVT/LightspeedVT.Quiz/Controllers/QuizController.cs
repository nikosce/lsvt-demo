using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LightspeedVT.Quiz.Controllers
{
    [Produces("application/json")]
    [Route("api/quiz")]
    public class QuizController : Controller
    {
        [HttpGet("[action]")]
        [Route("course/{id:int}")]
        public Course GetCourse(int id)
        {
            var data = GetData();
            return data.First(o => o.Id == id);
        }

        [HttpGet("[action]")]
        [Route("question/{courseId:int}/{questionSortOrder:int}")]
        public Question GetQuestion(int courseId, int questionSortOrder)
        {
            var data = GetData();
            var course = data.First(o => o.Id == courseId);
            return course.Questions.First(o => o.SortOrder == questionSortOrder);
        }

        private IQueryable<Course> GetData()
        {
            var courses = new List<Course>();

            var c = new Course()
            {
                Id = 1,
                Name = "How to Sort Lists"
            };
            courses.Add(c);

            var q1 = new Question()
            {
                Id = 1,
                Name = "Freegan whatever letterpress, helvetica kale chips four loko gluten-free. Ethical gochujang, pour-over lomo sed listicle ullamco four dollar toast chambray eiusmod. Nulla asymmetrical tacos, drinking vinegar enim retro ea do.",
                SortOrder = 1,
                CourseId = 1
            };
            q1.Answers.Add(new Answer()
            {
                Id = 1,
                Name = "Lorum ipsum dolor... It's an answer that goes here.",
                SortOrder = 1,
                QuestionId = 1
            });
            q1.Answers.Add(new Answer()
            {
                Id = 2,
                Name = "Squid migas... It's just another answer here. You know what to do.",
                SortOrder = 2,
                QuestionId = 1
            });
            q1.Answers.Add(new Answer()
            {
                Id = 3,
                Name = "Clinche narwhal, masquarading as a lame answer.",
                SortOrder = 3,
                QuestionId = 1
            });
            q1.Answers.Add(new Answer()
            {
                Id = 4,
                Name = "Humblebrag... looks like another answer, so reorder that shyt.",
                SortOrder = 4,
                QuestionId = 1
            });
            c.Questions.Add(q1);


            var q2 = new Question()
            {
                Id = 2,
                Name = "How do you say the alphabet?",
                SortOrder = 2,
                CourseId = 1
            };
            q2.Answers.Add(new Answer()
            {
                Id = 5,
                Name = "D",
                SortOrder = 1,
                QuestionId = 2
            });
            q2.Answers.Add(new Answer()
            {
                Id = 6,
                Name = "C",
                SortOrder = 2,
                QuestionId = 2
            });
            q2.Answers.Add(new Answer()
            {
                Id = 7,
                Name = "A",
                SortOrder = 3,
                QuestionId = 2
            });
            q2.Answers.Add(new Answer()
            {
                Id = 8,
                Name = "B",
                SortOrder = 4,
                QuestionId = 2
            });
            c.Questions.Add(q2);

            var q3 = new Question()
            {
                Id = 3,
                Name = "Sort these words in alphabetical order:",
                SortOrder = 3,
                CourseId = 1
            };
            q3.Answers.Add(new Answer()
            {
                Id = 9,
                Name = "Cat",
                SortOrder = 1,
                QuestionId = 3
            });
            q3.Answers.Add(new Answer()
            {
                Id = 10,
                Name = "Dog",
                SortOrder = 2,
                QuestionId = 3
            });
            q3.Answers.Add(new Answer()
            {
                Id = 11,
                Name = "Bat",
                SortOrder = 3,
                QuestionId = 3
            });
            q3.Answers.Add(new Answer()
            {
                Id = 12,
                Name = "Ant",
                SortOrder = 4,
                QuestionId = 3
            });
            c.Questions.Add(q3);

            var q4 = new Question()
            {
                Id = 4,
                Name = "How do you count to 4?",
                SortOrder = 1,
                CourseId = 1
            };
            q4.Answers.Add(new Answer()
            {
                Id = 13,
                Name = "2",
                SortOrder = 1,
                QuestionId = 1
            });
            q4.Answers.Add(new Answer()
            {
                Id = 14,
                Name = "1",
                SortOrder = 2,
                QuestionId = 1
            });
            q4.Answers.Add(new Answer()
            {
                Id = 15,
                Name = "4",
                SortOrder = 3,
                QuestionId = 1
            });
            q4.Answers.Add(new Answer()
            {
                Id = 16,
                Name = "3",
                SortOrder = 4,
                QuestionId = 1
            });
            c.Questions.Add(q4);


            return courses.AsQueryable();
        }

        public class Course
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public IList<Question> Questions { get; set; }
            public Course()
            {
                this.Questions = new List<Question>();
            }
        }

        public class Question
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int CourseId { get; set; }
            public int SortOrder { get; set; }
            public IList<Answer> Answers { get; set; }
            public Question()
            {
                this.Answers = new List<Answer>();
            }
        }

        public class Answer
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int QuestionId { get; set; }
            public int SortOrder { get; set; }
        }
    }
}