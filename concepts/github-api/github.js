let GithubUserCard = {
	template: '#github-user-card-template',
	props: ['username'],
	data() {
		return {
			data: null,
			followerCount: -1
		}
	},
	created() {
		// AJAX call to github's api:
		// fetch method
		// axios library
		axios.get(`https://api.github.com/users/${this.username}`).then(response => {
			this.data = response.data;
		});
		axios.get(`https://api.github.com/users/${this.username}/followers`).then(response => {
			this.followerCount = response.data.length;
		});
	},
	computed: {
		firstName() {
			return this.data['name'] ? this.data['name'].split(' ')[0] : "";
		},
		userYearJoined: function() {
			let date = new Date(this.data["created_at"]);
			return date.getFullYear();
		}
	}
};

new Vue({
	el: "#github-profiles",
	components: {
		'github-user-card': GithubUserCard
	}
});
