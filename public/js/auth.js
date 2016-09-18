jQuery(function($){
	Auth.init();

});

var Auth = {

	init: function() {
		//$(".alert-danger").show();
	},
	checkFields: function(){

		var login = $("#login").val();
		var password = $("#password").val();
		if(login.length < 3 || password.length < 5) return false;
		else{
			return {
				login: login,
				password: password
			}
		}
	},
	auth: function(){
		var authInfo = Auth.checkFields();
		if(!authInfo){
			$(".form-group ").each(function (index) {
				if($(this).children('input').val().length < 3){
					$(this).addClass("has-error");
				}else{
					$(this).removeClass("has-error");
				}
			})
		}else{
			let data = "login=" + authInfo.login + "&password="+ authInfo.password;
			let result = fetch('/auth/signIn', {
				method: "POST",
				body: data,
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
				},
				credentials: 'include'
			});
			result.then(function(response){
				if(response.status==401){
					Auth.showError();
				}else if(response.status == 500){
					alert("Какая-то серверная ошибка произошла")
				}else{
					window.location.href = '/';
				}
			})
				.catch(function(err){
					console.log(err);
				})
		}

	},
	showError: function(){
		$(".alert-danger").css('visibility', 'visible');
	},

	hideError: function(){
		$(".alert-danger").css('visibility', 'hidden');
	},
	logout: function(){
		let result = fetch('/auth/logout', {
			method: "POST",
			credentials: 'include'
		});
		result.then(function(response){
			window.location.href = '/';
		})
	}
}