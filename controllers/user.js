//moduler 
var mysql = require('mysql');
const express = require('express');
const app = express();

//authentication check
exports.authentication = (req, res, next) => {

   if (req.session.mail != undefined) {
      next();
   }
   else {
      res.render('user/home', { user: "" });
   }
}

// show the home page
exports.getHome = (req, res, next) => {

   if (req.session.mail != undefined) {
      return res.render('user/home', { user: req.session.mail });
   }
   else {
      return res.render('user/home', { user: "" });
   }
}

//show the login page
exports.getLogin = (req, res, next) => {
   res.render('user/loginAccount', { user: "", msg: [], err: [] });
}

//post page of login
exports.postLogin = (req, res, next) => {

   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });
   if(connectDB){
      console.log("Database Connect");
   
   }
   else{
      console.log("Not Connect");

   }

   data = "SELECT * " +
      "FROM  user " +
      "WHERE email = " + mysql.escape(req.body.mail) +
      " AND password = " + mysql.escape(req.body.pass);


   connectDB.query(data, (err, result) => {
      if (err) throw err; // show if any error have
      else {
         if (result.length) {
            req.session.mail = result[0].email;
            res.render('user/home', {user: result[0].email});
         }
         else {
            res.render('user/loginAccount', { user: "", msg: [], err: ["Please Check Your information again"] });
         }

      }
   })

}


// show create account page
exports.getCreateAccount = (req, res, next) => {
   res.render('user/createAccount', { user: "", msg: [], err: [] })
}

//get data from user for create account
exports.postCreateAccount = (req, res, next) => {

   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });

   var p1 = req.body.pass;
   var p2 = req.body.con_pass;

   if (p1 != p2) { // if password doesn't match 
      return res.render("user/createAccount", { user: "", msg: [], err: ["Password Doesn't Match"] })
   }

   var data = "INSERT INTO allotment " +
      " VALUES ( '" + req.body.address + "' ,'" + req.body.gender + "','" + req.body.name + "','" + req.body.status + "','" + req.body.date + "','" + p1 + "')";

   connectDB.query(data, (err, result) => {
      if (err) throw err;// if db has error, show that 
      else {
         res.render('user/createAccount', { user: "", msg: ["Account Create Successfuly"], err: [] }); //show login page
      }
   })
}

//get request for category
exports.getCategory = (req, res, next) => {

   res.render('user/category', { user: req.session.mail });
}

//post request of category
exports.postCategory = (req, res, next) => {
   //console.log(req.body);
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });

   data = "SELECT * " +
      " FROM  category " +
      " WHERE name = " + mysql.escape(req.body.cat) +
      " AND type = " + mysql.escape(req.body.type) +
      " AND available > 0";

   connectDB.query(data, (err, result) => {
      if (err) throw err; //show if error found
      else {
         //console.log(result);
         return res.render('user/showCategory', { user: req.session.mail, rooms: result })
      }
   })

}

// get booking data 
exports.postBooking = (req, res, next) => {
   // console.log(req.body);

   res.render('user/bookingConfirm.ejs', { user: req.session.mail, name: req.body.name, type: req.body.type, cost: req.body.cost });
}

//post status request

exports.postStatus = (req, res, next) => {

   //console.log(req.body);
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });
   var date = req.body.date;
   //console.log(date)
   data = "INSERT INTO bookingstatus " +
      " VALUES ('" + req.session.mail + "','" + req.body.name + "','" + req.body.type + "','" + req.body.roomWant + "','" + 0 + "','" + date + "')"

   data1 = "SELECT * " +
      " FROM  bookingstatus " +
      " WHERE email = " + mysql.escape(req.session.mail);
      
   connectDB.query(data, (err, reslt) => {
      if (err) throw err;
      else {
         connectDB.query(data1, (err1, result) => {
            for (i in result) {
               var a = result[i].date
               a = a.toString()
               result[i].date = a.slice(0, 15);
            }
            res.render('user/statusShow', { user: req.session.mail, msg: "Your booking is placed", err: "", data: result });
         })
      }
   })
}


//get status
exports.getShowStatus = (req, res, next) => {

   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });

   data = "SELECT * " +
      " FROM  allotment ";

   connectDB.query(data, (err, result) => {

      if (err) throw err;
      else {
         for (i in result) {
            var a = result[i].date
            a = a.toString()
            result[i].date = a.slice(0, 15);
         }
         if (result.length < 1) {
            res.render('user/statusShow', { user: req.session.mail, msg: "", err: "You dont have any data", data: result });
         }
         else {
            res.render('user/statusShow', { user: req.session.mail, msg: "", err: "", data: result });
         }
      }
   })
}


//get status
exports.getalert = (req, res, next) => {
   console.log("hello");
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });
   let sql = `select * from alert`
   let query = connectDB.query(sql,['alert'],(err,results)=>{
       if(err) throw err;
       else console.log("success");
       res.render('user/category',{data:results});
});

}




//delete booking request
exports.deleteBooking =(req,res,next)=>{
   //console.log(req.body);
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });

   data = "DELETE FROM allotment " +
   " WHERE id = " + mysql.escape(req.body.id);
  
   connectDB.query(data,(err,result)=>{
      if(err) throw err;
      else{
         next();
      }
   })

}

//get request for category
exports.getdelete = (req, res, next) => {
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });
   console.log("hello");
   const ID = req.params.id;
   let sql = `DELETE from allotment where id = ${ID}`
   let query = connectDB.query(sql,['allotment'],(err,results)=>{
       if(err) throw err;
       else console.log("delete success");
       res.redirect('/showStatus');
});

}

// app.get('/delete', (req, res) => {
//    console.log("hello");
//    const ID = req.params.id;
//    let sql = `DELETE from allotment where id = ${id}`
//    let query = connection.query(sql,[covidtable],(err,results)=>{
//        if(err) throw err;
//        else console.log("delete success");
//        res.redirect('/');
//    });
// });


//show contact page
exports.getContact =(req,res,next)=>{

   if(req.session.mail== undefined){
      res.render('user/contact', { user: "" });
   }
   else{
      res.render('user/contact', { user: req.session.mail });
   }
   
}

//get request for category
exports.getedit = (req, res, next) => {
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });
   console.log("hello");
   const ID = req.params.id;
   let sql = `Select * from allotment where id = ${ID}`
      let query = connectDB.query(sql,['allotment'],(err,results)=>{
       if(err) throw err;
       else console.log("edit success");
       res.render('user/user_edit',{data:results});
});

}

//show contact page
exports.getupdate =(req,res,next)=>{
   var connectDB = mysql.createConnection({
      host:"miniproj.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
      user:"sinchaju",
      password:"sinchaju123",
      database:"ianb",
      port:"3306"
   });
console.log("getupdate")
   const ID = req.params.id;
   // let sql = `DELETE from allotment where id = ${ID}`
   let sql = "update allotment SET name='"+req.body.name+"',  address='"+req.body.address+"',  gender='"+req.body.gender+"',status='"+req.body.status+"' where id ="+ID;;

   let query = connectDB.query(sql,['allotment'],(err,results)=>{
      if(err) throw err;
      else console.log("edit success");
      res.redirect('/showStatus');
});
   
}



//show contact page
exports.getContact =(req,res,next)=>{
   if(req.session.mail== undefined){
      res.render('user/user_edit', { user: "" });
   }
   else{
      res.render('user/user_edit', { user: req.session.mail });
   }
   
}

//logout
exports.logout = (req, res, next) => {
   req.session.destroy();
   res.render('user/home', { user: "" });

}

// //edit
// app.get('/edit/:ID', (req, res) => {
//    const ID = req.params.ID;
//    let sql = `Select * from allotment where ID = ${ID}`
//    let query = connection.query(sql,[covidtable],(err,results)=>{
//        if(err) throw err;
//        res.render('user_edit',{
//            title: "Edit Info",
//            covidlist :results[0],
//        })
//    });
// });
