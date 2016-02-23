var model = {

	},
	controller = {

	},

	viewDisplay = {

	},

	viewInsert = {

	};

	var courseForm = document.getElementById("course-form"),
	lessonForm = document.getElementById("lesson-form"),
	videoForm = document.getElementById("video-form"),
    courseList = document.getElementById("inner-content"),

	addAttributes = function(node, value, content, display , index) {
		node.setAttribute("data-id",value);
		node.setAttribute("data-content",content);
		node.setAttribute("data-shown",display);
		node.setAttribute("data-index",index);
		//node.innerHTML = value;
	};

	/*hideAllForms = function () {
		courseForm.setAttribute("style" , "display:none;");
		lessonForm.setAttribute("style" , "display:none;");
		videoForm.setAttribute("style" , "display:none;");
	};*/

var printList = function () {

	var cnt = 0;


	//accumulate all the courses and then append them;\
	//console.log(Courses);
	Courses.forEach(function (courseElement)
	{
		var courseCard = document.createElement("div");
        courseCard.setAttribute("class","inner-content__course-card");
		var course = document.createElement("div");
        course.setAttribute("class","inner-content__course-card__course");
		addAttributes (course , courseElement.name, "course" , "false" , cnt++);
		//console.log("inside retrieve")
		//console.log(courseElement);
		course.innerHTML = courseElement.name ;
        courseCard.appendChild(course);
		courseList.appendChild (courseCard);


	});


	
	
};

printList();
/*hideAllForms();*/


var createDomHolder = function (dom, holder) {
	var holderNode = document.createElement("div");
	holderNode.setAttribute("id" , holder);
	return holderNode;
}

var hideDom = function (dom) {
    
    console.log(dom.innerHTML);

	dom.setAttribute("data-shown", "false");
    
    
	dom.innerHTML = dom.getAttribute("data-id");
    //console.log(dom.innerHTML);
}

//TODO convert to 
courseList.onclick = function (event) {
	var dom = event.target;

	console.log (dom.parentNode);
	
	var contentAttr = dom.getAttribute('data-content');

	if (contentAttr == "course") {

		var displayAttr = dom.getAttribute ("data-shown");
		var lessonWrapper = createDomHolder (dom,"lesson-holder");
        
        
        lessonWrapper.setAttribute("class","inner-content__course-card__lessons");
        
		var idx = parseInt(dom.getAttribute("data-index"));
		var lessonIds = Courses[idx].lessons;
		
		
		if (displayAttr == "false") {
			//console.log (Courses[idx]);
			dom.setAttribute("data-shown", "true");

			//console.log(lessonIds, "Asfsdfs");
			for (var lessonId of lessonIds) {
                var lessonContainer = document.createElement("div");
                lessonContainer.setAttribute("class","lesson-wrapper");
				var lessonNode = document.createElement("div");
				//console.log(lessonId);
				//console.log("cont attr course");
				//console.log(Lessons);
                lessonNode.setAttribute("class","lesson-name");
                lessonNode.innerHTML = Lessons[parseInt(lessonId)].name;
				addAttributes (lessonNode , Lessons[parseInt(lessonId)].name , "lesson" , "false" , Lessons[lessonId].id);
				//lessonNode.setAttribute("data-lesson-idx" , dom.getAttribute("data-index"));
                lessonContainer.appendChild(lessonNode);
				lessonWrapper.appendChild(lessonContainer);

			}
			dom.parentNode.appendChild(lessonWrapper);

		} else {
			hideDom(dom);
		}
	}

	else if (contentAttr == "lesson") {
			var displayAttr = dom.getAttribute ("data-shown"),

				videoWrapper = createDomHolder (dom , "video-holder"),
				idx = parseInt(dom.getAttribute("data-index")),
				videos = Lessons[idx].videos;
			
                videoWrapper.setAttribute("class","lesson-wrapper");
			if (displayAttr == "false") {

				dom.setAttribute("data-shown", "true");

				

				
				videos.forEach (function (video)  {
					var videoNode = document.createElement("div");
                    videoNode.setAttribute("class","lesson-wrapper__videos");
                    videoNode.innerHTML = Videos[parseInt(video)].url;
					addAttributes (videoNode , Videos[parseInt(video)].url , "video" , "false" , Videos[parseInt(video)].id);
					videoWrapper.appendChild(videoNode);

				});	
				dom.parentNode.appendChild(videoWrapper);

			} else {
				hideDom(dom);
			}
	}
};

/*
var addButton = document.getElementById("add-buttons");


//which is better ? write Html or create doms ?
addButton.onclick = function (event) {
	var dom = event.target;
	var attr = dom.getAttribute ("id");

	hideAllForms();

	//refresh the data
	
	switch (attr) {
		case "course-button":
			courseForm.setAttribute("style" , "display:block;");
			break;

		case "lesson-button":
			lessonForm.setAttribute("style" , "display:block;");
			addCoursesOptions("course-lesson-option");
			break;

		case "video-button":
			videoForm.setAttribute("style" , "display:block;");
			addCoursesOptions("course-video-option");
			updateOptions();
			break;
	}
}

var courseSubmit = document.getElementById("submit-course");

courseSubmit.onclick = function () {
	var courseName = document.getElementById("add-course").value;
	
	if(courseName) {
		Courses.push(new Course(courseName,undefined,courseId++));
		
		localStorage.setItem('Courses',JSON.stringify(Courses));
		console.log ("added " + courseName);

	}

	return false;
}

var lessonSubmit = document.getElementById("submit-lesson");

lessonSubmit.onclick = function () {


	var course = getSelectedOption("course-lesson-option"),
		lesson = getInputValue("add-lesson");
	
	
	//abc.
	console.log("lesson add", lessonId);
	Lessons.push(new Lesson(lessonId,lesson,undefined,course));
	localStorage.setItem('Lessons',JSON.stringify(Lessons));
	
	Courses[parseInt(course)].lessons.push(lessonId);
	localStorage.setItem('Courses',JSON.stringify(Courses));
	lessonId++;
	console.log("in the lesson submit");
	console.log(JSON.parse(localStorage.getItem('Courses')));
	console.log(JSON.parse(localStorage.getItem('Lessons')));

	
	
	return false;

}

var videoSubmit = document.getElementById("submit-video");

videoSubmit.onclick = function () {
	var course = getSelectedOption("course-video-option"),
		lesson = getSelectedOption("lesson-video-option"),
		video = getInputValue("add-video");
		console.log("video" + video);

	Videos.push(new Video(videoId,video,lesson)); 
	localStorage.setItem('Videos',JSON.stringify(Videos));
	console.log(parseInt(lesson), videoId);
	Lessons[parseInt(lesson)].videos.push(videoId);

	localStorage.setItem('Lessons',JSON.stringify(Lessons));
	videoId++;

	console.log("in the video submit");
	console.log(JSON.parse(localStorage.getItem('Lessons')));
	console.log(JSON.parse(localStorage.getItem('Videos')));

	return false;
}

var getSelectedOption = function (id) {
	var dom = document.getElementById(id);
	console.log("dom.options[dom.selectedIndex].getAttribute(value)");
	console.log(dom.options[dom.selectedIndex].value);
	return dom.options[dom.selectedIndex].value;
};

var getInputValue = function (id) {
	return document.getElementById(id).value;
};

var addCoursesOptions = function (domId) {
	var courseDom = document.getElementById(domId),
		docFrag = document.createDocumentFragment();
		courseDom.innerHTML = "";
		
		console.log(Courses);
		Courses.forEach (function(course) {
			console.log("++++++++++++++");
			var abc = course.name;
			console.log(abc);
			var jOption = document.createElement("option");
				jOption.setAttribute("value" , course.id);
				jOption.innerHTML = course.name;
			docFrag.appendChild(jOption);

		});
		courseDom.appendChild (docFrag);
		
};

var courseVideo = document.getElementById("course-video-option");

var updateOptions = function () {

	var courseId = getSelectedOption("course-video-option");
	
	lessonIds = Courses[parseInt(courseId)].lessons;
	console.log("invideo log options");
	console.log(lessonIds);
	var lessonDom = document.getElementById("lesson-video-option"),
		docFrag = document.createDocumentFragment();
	lessonDom.innerHTML = "";


	for(lesson of lessonIds) {
				console.log("further in");
				console.log(lesson);
			
				var jOption = document.createElement("option");
				
				lesson = Lessons[lesson];
				console.log(lesson);
				jOption.setAttribute("value" , lesson.id);

				jOption.innerHTML = lesson.name;
				docFrag.appendChild(jOption);
				
			
			lessonDom.appendChild (docFrag);
		
	}
};

courseVideo.onchange = updateOptions;
*/