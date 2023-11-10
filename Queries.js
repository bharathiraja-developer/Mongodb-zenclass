/*

MongoDB-Zenclass design :

    1. Find all the topics and tasks which are thought in the month of October.
        query : db.topics.aggregate([
				{
					$match:{date:/oct/}
				},
				{
					$lookup:{
					from: "tasks",
					localField:"taskId",
					foreignField:"taskId",
					as:"Task"
				}
				}
				]).forEach(doc=>{
						print("Main Topic : "+doc.Maintopic);
						print("Sub Topic : "+doc.subtopic);
						if(doc.Task[0]) print("Activities : "+doc.Task[0].taskurl);
				});
							
	2. Find all the company drives which appeared between 15-oct-2020 and 31-oct-2020.
		query : db.company_drives.find({date:{$gte:"15-oct-2020",$lte:"31-oct-2020"}});

	3. Find all the company drives and students who are appeared for the placement.
		query : db.company_drives.aggregate([
				{
					$lookup:{
							from:"users",
							localField:"attended_studentsId",
							foreignField:"id",
							as:"Attended_students"
				}
				}
				]).forEach(doc=>{
					print("Company name : "+doc.company_name);
					print("Date : "+doc.date);
					print("Attended Students : ");
				doc.Attended_students.map(file=>{
				print(`Name :${file.name} email : ${file.email} phone : ${file.phone}`);
				})
				});

	4. Find the number of problems solved by the user in codekata.
		query : db.users.aggregate([
				{
				$lookup:{
				from:"codekata",
				localField:"id",
				foreignField:"student_id",
				as:"Solved"
				}
				}
				]).forEach(doc=>{
				print(`Name: ${doc.name} Codekata Solved: ${doc.Solved[0].solved}`)
				});

	5. Find all the mentors with who has the mentee's count more than 15.
		query : db.mentors.aggregate([
				{
				$unwind:"$mentees"
				},
				{
				$group:{
				_id:"$id",
				"name":{$first:"$name"},
				"email":{$first:"$email"},
				"phone":{$first:"$mobile"},
				"mentees":{$sum:1}
				}
				},{
				$match:{mentees:{$gt:15}}
				}
				]).forEach(doc=>{
				print(`Name : ${doc.name} , email : ${doc.email} , phone : ${doc.email}`)
				});

	6. Find the number of users who are absent and task is not submitted  between 15-oct-2020 and 31-oct-2020.
		query : 
		
		
					


*/
