

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Soul Talks, a space for exploring the intersection of spirituality and everyday life. Our mission is to create a community that fosters open-mindedness, personal growth, and a deeper understanding of the world around us. ";
const aboutContent = "Welcome to our spiritual blog! We are a group of individuals who share a passion for exploring the mysteries of the universe and the deeper aspects of the human experience. We believe that spirituality is a personal journey that can take many forms, and we strive to create a space where people from all backgrounds and beliefs can come together to share their insights and experiences.Our team consists of individuals with diverse backgrounds and areas of expertise, including meditation, yoga, energy healing, shamanism, and more.We are united by our shared commitment to personal growth, and our desire to help others along their own spiritual paths.Our mission is to provide a platform for individuals to share their stories, insights, and practices, and to inspire others on their own spiritual journeys.We believe that by coming together and sharing our experiences, we can learn from each other and grow together.Whether you are new to spirituality or have been on this path for years, we invite you to join us on this journey of self - discovery and exploration.We hope that our blog will serve as a source of inspiration, guidance, and community for all who seek to connect with their inner selves and the greater universe around us.Thank you for visiting our site, and we look forward to connecting with you!"
const contactContent = "Welcome to our spirituality blog! We're thrilled that you're interested in getting in touch with us. If you have any questions, comments, or feedback about the content on our blog, please feel free to reach out to us using the contact form below. We value your input and will do our best to respond as soon as possible. Additionally, if you have any suggestions for topics you'd like to see covered on our blog, or if you'd like to contribute an article, please let us know. We're always looking for new ideas and perspectives to share with our readers. Thank you for visiting our blog and we look forward to hearing from you!"



// Connecting to MongoDB Atlas
const url = "mongodb+srv://dhruv25nov:Dhruv25nov@cluster0.2kgw67n.mongodb.net/BlogWebsite?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Home Route
app.get("/", function (req, res) {
  Post.find({})
    .then((allPost) => {

      res.render("home", {
        startingContent: homeStartingContent,
        posts: allPost
      });

    })
    .catch((err) => {
      throw err;
    });
});

// About page route
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

// Contact page route
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

//Compose page route
app.get("/compose", function (req, res) {
  res.render("compose");
});


//Creating post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
// Creating Post model
const Post = mongoose.model("Post", postSchema)


// Secret route for composing posts
app.post("/compose", function (req, res) {

  const title = req.body.postTitle;
  const content = req.body.postBody;

  const post = new Post({
    title: title,
    content: content,
  });

  post.save()
    .then(() => {
      res.redirect("/");

    })
    .catch((err) => {
      console.log(err);

    })

});





// Route for a particular post when user clicks on Read more
app.get("/posts/:postId", function (req, res) {
  const postId = req.params.postId;

  Post.findOne({ _id: postId })
    .then((post) => {
      res.render("post", {
        title: post.title,
        content: post.content
      });

    })
    .catch((err) => {
      throw err;
    });

});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
