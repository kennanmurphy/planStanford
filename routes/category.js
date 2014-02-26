var data = require('../data.json');


exports.viewCategory = function(req,res){

  var uniYear = "2014";
  var category = req.params.category;
  var requirement = req.params.requirement;
  var major = 'Computer Science';
  if(requirement == "University"){
      major = "Buffer";
  }
  console.log(major);
  var requirements = data['requirements'][requirement][uniYear][major];
  //console.log(requirements);
  req.session.current_category = category;
  req.session.current_requirement = requirement;

  var classes_in_category;
  var class_electives;
  var about;

  for(var i=0; i< requirements.length; i++){
    var obj = requirements[i];
    if(obj.name == category){
      classes_in_category = obj.classes;
      class_electives = obj.electives;
      about = obj.about;
    }
  }

  // For Debug atm, gets classes you've chosen
  var current_classes = null;
  try{
    current_classes = req.session.current_classes[requirement][category];
    console.log("in view category");
    console.log(current_classes);
  }catch(err){
    console.log(err)
    console.log("Not classes in that category");
  }


  res.render("category",{
    "requirement" : requirement, 
    "category" : category, 
    "classes" : classes_in_category,
    "electives" : class_electives,
    "about" : about,
    "current_classes" : current_classes
  });
}