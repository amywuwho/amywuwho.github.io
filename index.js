



function handleClick() {
	var text = $(this).text()
	alert(text)
}

function whenPageIsReady() {
	console.log("wu")
}
$(document).ready(function() {
	$(".panel").click(handleClick)
})