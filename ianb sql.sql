create database ianb;

use ianb;

show tables;

CREATE TABLE `admin` (
  `name` varchar(20) NOT NULL,
  `pass` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`name`, `pass`) VALUES
('admin', 'admin');

-- -------------------------------------------------------

CREATE TABLE `allotment` (
  `address` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` varchar(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Dumping data for table `bookingstatus`
--

INSERT INTO `allotment` (`address`, `gender`, `name`, `status`, `date`) VALUES
('kormangla', 'Female', 'Sammy', 'OnUse','2020-05-03');

INSERT INTO `allotment` (`address`, `gender`, `name`, `status`, `date`) VALUES
('madiwala', 'Male', 'Santhosh', 'Returned','2020-05-03');

INSERT INTO `allotment` (`address`, `gender`, `name`, `status`, `date`) VALUES
('kormangla', 'Female', 'Sageetha', 'OnUse','2020-05-03');

INSERT INTO `allotment` (`address`, `gender`, `name`, `status`, `date`) VALUES
('HSR', 'Male', 'Amit', 'OnUse','2020-05-03');

INSERT INTO `allotment` (`address`, `gender`, `name`, `status`, `date`) VALUES
('BTM', 'Male', 'Anul', 'OnUse','2020-05-03');


select * from allotment;




--
-- Indexes for table `bookingstatus`
--

Alter table `allotment` add column id int not null auto_increment Primary key;



--
-- Constraints for table `bookingstatus`
--

CREATE TABLE `user` (
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `email`, `phone`, `password`) VALUES
('admin', 'admin@admin.com', '1', '1'),
('Sabit', 'iamsabit99@gmail.com', '01744248058', '1'),
('Sabit', 'st.sabit13@gmail.com', '01744248058', '1');




CREATE TABLE `alert` (
  `fall` varchar(100) NOT NULL,
   `time`  timestamp default now()
);

drop table alert;


Alter table `alert` add column id int not null auto_increment Primary key;

INSERT INTO `alert` (`fall`) VALUES
('Fall Detected');

INSERT INTO `alert` (`fall`) VALUES
('Fall Detected');

select * from alert;


