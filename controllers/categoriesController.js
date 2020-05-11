const categories = require("../models/rategoryDAO");
const validator = require("email-validator");

exports.createCategory = function (req, res, next) {
  const { id, email, name, description, questions } = req.body;
  const category = {
    id,
    email,
    name,
    description,
    questions,
  };

  let errors = [];

  if ((!id, !email, !name)) {
    errors.push("Please fill in all fields");
  }

  if (name.length > 40) {
    errors.push("Name of the category should have maximum 40 characters");
  }

  if (name.length <= 1) {
    errors.push("Name of the category should have minimum 2 characters");
  }

  if (name.length > 30) {
    errors.push(
      "Description of the category should have maximum 30 characters"
    );
  }

  if (!validator.validate(email)) {
    errors.push("Enter correct email address");
  }

  categories.create(category, function (err, category) {
    if (err) {
      res.json({
        error: err,
      });
    } else if (errors.lenght > 0) {
      res.json({ error: errors });
    } else {
      res.json({
        message: "Hero created successfully",
      });
    }
  });
};

exports.getCategories = function (req, res, next) {
  categories.get({}, function (err, categories) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        categories: categories,
      });
    }
  });
};

exports.getCategory = function (req, res, next) {
  categories.get({ email: req.params.email }, function (err, categories) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        categories: categories,
      });
    }
  });
};

exports.getCategoryById = function (req, res, next) {
  categories.get({ _id: req.params.id }, function (err, categories) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        categories: categories,
      });
    }
  });
};

exports.updateCategory = function (req, res, next) {
  const { id, email, name, description, questions } = req.body;
  const category = {
    id,
    email,
    name,
    description,
    questions,
  };

  categories.update({ _id: req.params.id }, category, function (err, category) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: "Hero updated successfully",
      });
    }
  });
};

exports.removeCategory = function (req, res, next) {
  categories.delete({ _id: req.params.id }, function (err, category) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: "Hero deleted successfully",
      });
    }
  });
};
