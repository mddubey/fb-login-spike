var login = function() {
	FB.init({
		appId: '1584958711764489',
		status: true,
		xfbml: true,
		version: 'v2.3'
	});

	FB.login(function(response) {
		if (response.authResponse) {
			console.log('Welcome!  Fetching your information.... ');
			var url = "/me/groups?limit=5000&access_token=" + response.authResponse.accessToken;
			var twSTEPGroupID = 282099168624476;
			FB.api(url,
				function(response) {
					var isSTEPMember = response.data.some(function(group) {
						return group.id == twSTEPGroupID;
					});
					document.getElementById('login_btn').style.visibility = "hidden";
					if (!isSTEPMember) {
						document.getElementById('login_status').textContent = 'aap STEP me nahi ho... How sad :(!!';
						return;
					}
					document.getElementById('login_status').textContent = 'aap STEP me ho... Not Bad :)!!';
				}
			);
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {
		scope: "email, user_groups"
	});
}