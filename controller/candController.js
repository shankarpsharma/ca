const candModel = require("../model/candModel");
const { cands } = require("../model/candModel");

/-------------------insert a candidate------------------------------/
exports.register = async (req, res) => {
  try {
    let { name, email } = req.body; //

    let isCandidate = await cands.findOne({ email });

    if (isCandidate) {
      throw new Error(`${isCandidate} exists`);
    }
    let student = { name, email };
    let saveStudent = await cands.create(student);
    console.log(saveStudent, "SaveStudent");

    if (!saveStudent) {
      throw new Error(" unable to save");
    }
    res
      .status(400)
      .json({ message: "Candidate is registerd succesfully", saveStudent });
    console.log(saveStudent);
  } catch (error) {
    res.status(400).json(error.message);
  }
};


/--------------------------insert the test score of the paricular student with the help of particular unique id-----------------/
exports.score = async (req, res) => {
  try {
    let { test_score } = req.body;

    let scoreUpdate = await cands.findByIdAndUpdate(
      req.headers.id,
      { test_score: test_score },
      { new: true }
    );
    scoreUpdate = JSON.parse(JSON.stringify(scoreUpdate));

    res.status(200).json({
      status: 1,
      message: "scores added successfully",
      scoreUpdate,
    });
  } catch (error) {
    res.status(401).json({ status: 0, message: error.message });
  }
};


/-----------------------------get average and total marks of particular candidate with the unique id------------------------------/

exports.averageAndTotal = async (req, res) => {
  try {
    let student = await cands.findById(req.headers.id);
    JSON.parse(JSON.stringify(student));

    let average =
      (student.test_score["first_round"] +
        student.test_score["second_round"] +
        student.test_score["third_round"]) /
      3;
    let total =
      student.test_score["first_round"] +
      student.test_score["second_round"] +
      student.test_score["third_round"];

    let scoreUpdate = await cands.findByIdAndUpdate(
      req.headers.id,
      { average: average, total: total },
      { new: true }
    );
    scoreUpdate = JSON.parse(JSON.stringify(scoreUpdate));

    // res.status(200).json({
    //   status: 1,
    //   message: "average taken succesfully",
    //   data: scoreUpdate,
    // });
   
    return res.json({
      message: `the average and Total of the ${student.name} is ${average} and  is ${total}`,
    });
  } catch (error) {
    res.status(401).json({ status: 0, message: error.message });
  }
};


/-----------------------------get  total marks only, of all the students------------------------/

exports.getDetails = async (req, res) => {
  try {
    let allCandidate = await cands.find({});
    var array = [];
    //console.log(allCandidate,"l")
    if (allCandidate) {
      allCandidate.forEach((user) => {
        var a = `the total of ${user.name} is ${user.total}`;
        array.push(a);
      });
      //console.log(array, "Array");
      res.json({totalOfCandidate : array})
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/--------------get the highest marks of the student from all the entries----------------------------------/

exports.getHighest=async(req,res)=>{
try{
  let theList=await cands.find({});
  //console.log(theList)
  var max=0;
  var a;
  theList.forEach(thelist =>{
    if(thelist.total>max) {
      max=thelist.total
       a = `the highest is of ${thelist.name} is ${max}`;
    };
  })
  res.json({message : a})
console.log(a);
} catch(error){
  res.status(400).json({ message: error.message });
}
}