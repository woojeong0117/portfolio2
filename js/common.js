// 콘솔꾸미기
function consoleDesign() {
	console.log(
		`%c
		██╗  ██╗███████╗██╗     ██╗      ██████╗ 
		██║  ██║██╔════╝██║     ██║     ██╔═══██╗
		███████║█████╗  ██║     ██║     ██║   ██║
		██╔══██║██╔══╝  ██║     ██║     ██║   ██║
		██║  ██║███████╗███████╗███████╗╚██████╔╝
		╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ 
																						 
		`,
		"color:#BA94D1"
	);

	console.log(
		`%c🙋🏻‍♀️ %c잘부탁드립니다❤️💛❤️🧡💙💚❤️`,
		"font-size:100px",
		"font-size:50px; font-family:'Noto Sans KR'; color:#FF8DC7"
	);
}
consoleDesign(); // 콘솔꾸미기

// ====================================== start =========================================
// ======================== 스크롤 관련 ===========================

const topBtn = document.querySelector(".btn_top"),
	header = document.querySelector("#header");
let scrollAmount;

// docElement = document.documentElement;

window.addEventListener("scroll", () => {
	// 스크롤량 확인법 2개
	// docElement(변수).scrollTop
	// window.pageYOffset

	// top버튼 스크롤에따라 나타나기
	scrollAmount = window.pageYOffset;
	if (scrollAmount > 300) {
		topBtn.style.opacity = 1;
	} else {
		topBtn.style.opacity = 0;
	}

	// 헤더픽스시 색 변경
	if (scrollAmount != 0) {
		header.classList.add("on");
	} else {
		header.classList.remove("on");
	}

	if (html.dataset.theme === "light") {
		if (scrollAmount != 0) {
			header.classList.add("on");
		} else {
			header.classList.remove("on");
		}
	}
});

// top버튼 부드럽게
// 스크롤양 지정 window.scrollTo(x,y)
// 스크롤양 변경 window.scrollBy(x,y)
topBtn.addEventListener("click", e => {
	e.preventDefault();

	let scrollTop = setInterval(() => {
		if (scrollAmount != 0) {
			window.scrollBy(0, -50);
		} else {
			clearInterval(scrollTop);
		}
	}, 10);
});

// ======================== 모바일 헤더 ===========================

const openBtn = document.querySelector(".btn_open"),
	gnbArea = document.querySelector(".m_gnb_area"),
	closeBtn = document.querySelector(".btn_close"),
	body = document.body,
	gnbList = document.querySelectorAll(".m_gnb>li>a");

// 열기버튼

openBtn.addEventListener("click", e => {
	e.preventDefault();
	gnbArea.classList.add("on");
	body.classList.add("on");
});

// 닫기버튼

closeBtn.addEventListener("click", e => {
	e.preventDefault();
	gnbArea.classList.remove("on");
	body.classList.remove("on");
});

// list 클릭 시 해야할 일
for (let i = 0; i < gnbList.length; i++) {
	gnbList[i].addEventListener("click", () => {
		body.classList.remove("on");
		setTimeout(() => {
			gnbArea.classList.remove("on");
		}, 100);
	});
}

// ======================== dark / light 모드 ===========================

const toggleBtn = document.getElementById("toggle"),
	html = document.documentElement;

// html, body, head 접근방법
// <html> = document.documentElement
// <body> = document.body
// <head> = document.head

toggleBtn.addEventListener("change", () => {
	if (html.dataset.theme === "dark") {
		html.dataset.theme = "light";
	} else {
		html.dataset.theme = "dark";
	}
});

// ======================== 마우스커서 커스텀 ===========================

// 모바일 판별함수
function Mobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}

// 마우스커서 및 모바일 실행할일

const mouseCursor = document.querySelector(".cursor"),
	textElements = document.querySelector(".txt_hello");
if (Mobile()) {
	// 모바일일 경우
	mouseCursor.style.display = "none";
} else {
	// 모바일 외
	//커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
	function cursor(e) {
		mouseCursor.style.left = `${e.pageX}px`;
		mouseCursor.style.top = `${e.pageY - scrollY}px`;
	}
	window.addEventListener("mousemove", cursor);
	window.addEventListener("scroll", cursor);

	// mouse hover 애니메이션
	textElements.addEventListener("mouseenter", () => {
		mouseCursor.classList.add("hover");
	});

	textElements.addEventListener("mouseleave", () => {
		mouseCursor.classList.remove("hover");
	});

	// 반응형 시 pc에서 슬라이드 on/off 될때 강제로 새로고침해주기
	window.addEventListener("resize", () => {
		let windowWidth = window.innerWidth,
			timer = null;
		sec = 300;
		timer = setTimeout(() => {
			window.location.reload();
			console.log(windowWidth);
		}, sec);
	});
}

// ======================== 슬라이드 ===========================

if (matchMedia("screen and (min-width: 1201px)").matches) {
	const slide = document.querySelectorAll(".slide"),
		slideCount = slide.length,
		slideWrap = document.querySelector(".slider_wrap"),
		pagination = document.querySelector(".pagination");

	let slideIdx = 0,
		myVar;

	const pagerBtn = document.querySelectorAll(".pagination span");

	// 슬라이드위치, 페이지네이션 초기화
	function resetSlide() {
		for (var i = 0; i < slideCount; i++) {
			pagerBtn[i].className = pagerBtn[i].className.replace("active", "");
			slide[i].style.display = "none";
		}
	}

	// 슬라이드, 페이지네이션 활성화
	function activeSlide() {
		slide[slideIdx - 1].style.display = "flex";

		pagerBtn[slideIdx - 1].className += "active";
	}

	// 슬라이드 움직이기
	moveSlides();
	function moveSlides() {
		resetSlide();
		slideIdx++;
		if (slideIdx > slideCount) {
			slideIdx = 1;
		}
		activeSlide();
	}

	// 오토슬라이드
	function autoSlide() {
		myVar = setInterval(moveSlides, 4000);
	}

	function btnSlide(num) {
		slideIdx += num;
		resetSlide();
		if (slideIdx < 1) {
			slideIdx = slideCount;
		}
		if (slideIdx > slideCount) {
			slideIdx = 1;
		}
		activeSlide();
	}

	function currentSlide(num) {
		slideIdx = num;
		resetSlide();
		activeSlide();
	}

	// 슬라이드 멈추기
	function stopSlide() {
		clearInterval(myVar);
	}

	// 슬라이드에 마우스가 올라간 경우 루프 멈추기
	slideWrap.addEventListener("mouseenter", () => {
		stopSlide();
	});

	// 슬라이드에 마우스가 나온 경우 루프 추가하기
	slideWrap.addEventListener("mouseleave", () => {
		autoSlide();
	});

	// 드래그 시 슬라이드 이동하기
	// 변수 초기화
	let startPoint = 0,
		endPoint = 0;

	slideWrap.addEventListener("mousedown", e => {
		startPoint = e.pageX; // 마우스 드래그 시작위치저장
	});

	slideWrap.addEventListener("mouseup", e => {
		endPoint = e.pageX; // 마우스 드래그 끝위치 저장
		if (startPoint < endPoint) {
			// 마우스가 오른쪽으로 드래그 된 경우
			moveSlides(slideIdx + 1);
		} else if (startPoint > endPoint) {
			// 마우스가 왼쪽으로 드래그
			moveSlides(slideIdx - 1);
		}
	});

	// 모바일 터치 이벤트 (스와이프)
	slideWrap.addEventListener("touchstart", e => {
		startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
	});
	slideWrap.addEventListener("touchend", e => {
		endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
		if (startPoint < endPoint) {
			// 오른쪽으로 스와이프 된 경우
			moveSlides(slideIdx + 1);
		} else if (startPoint > endPoint) {
			// 왼쪽으로 스와이프 된 경우
			moveSlides(slideIdx - 1);
		}
	});
}

// 포트폴리오 스크롤 애니메이션

if (matchMedia("screen and (max-width: 1201px)").matches) {
	const options = {
		threshold: 0.3,
	};

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
			} else {
				entry.target.classList.remove("active");
			}
		});
	}, options);

	const slideList = document.querySelectorAll(".slide");

	slideList.forEach(el => observer.observe(el));
}

// ======================== 폼요소 작성관련 ===========================

// 파일업로드 시 이름변경

const upLoad = document.querySelector("#upload");
upLoad.addEventListener("change", function () {
	let fileName = document.querySelector("#filename");
	if (this.files[0] == undefined) {
		fileName.innerText = "선택된 파일없음";
		return;
	}
	fileName.innerText = this.files[0].name;
	fileName.style.color = `var(--color-background)`;
});

// 체크박스 체크여부 확인하여 알림창 띄우기

function AlertCheckbox() {
	const checkBox = document.querySelector(".checkbox_wrap input");
	if (checkBox.checked === true) return;
	alert("🙏 개인정보처리방침에 동의해주시기 바랍니다 🥰🥰");
}

// 핸드폰번호 대시 자동완성

function inputPhoneNumber(obj) {
	var number = obj.value.replace(/[^0-9]/g, "");
	var phone = "";

	if (number.length < 4) {
		return number;
	} else if (number.length < 7) {
		phone += number.substr(0, 3);
		phone += "-";
		phone += number.substr(3);
	} else if (number.length < 11) {
		phone += number.substr(0, 3);
		phone += "-";
		phone += number.substr(3, 3);
		phone += "-";
		phone += number.substr(6);
	} else {
		phone += number.substr(0, 3);
		phone += "-";
		phone += number.substr(3, 4);
		phone += "-";
		phone += number.substr(7);
	}
	obj.value = phone;
}
