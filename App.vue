<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
  /*每个页面公共css */
  @import './assets/style/common.scss';
  @import "./assets/style/project.scss";
</style>
