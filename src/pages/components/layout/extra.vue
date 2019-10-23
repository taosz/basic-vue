<!-- 其他：用户头像、通知 -->
<template>
	<div class="v-layout-extra g-flex-ac">
		<img :src="user.avatar" class="g-imgc-32 g-m-r-10">
		<!--		<el-dropdown>-->
		<!--			  <span class="el-dropdown-link">-->
		<!--				下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
		<!--			  </span>-->
		<!--			<el-dropdown-menu slot="dropdown">-->
		<!--				<el-dropdown-item>黄金糕</el-dropdown-item>-->
		<!--				<el-dropdown-item>狮子头</el-dropdown-item>-->
		<!--				<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
		<!--				<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
		<!--				<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
		<!--			</el-dropdown-menu>-->
		<!--		</el-dropdown>-->
		<el-dropdown
			placement="bottom"
			trigger="click"
			@click="handleOperate"
		>
			<p class="g-pointer">admin</p>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item name="set">
					<div class="line">个人账户设置</div>
				</el-dropdown-item>
				<el-dropdown-item name="change">
					<div class="line">修改密码</div>
				</el-dropdown-item>
				<el-dropdown-item name="logout">
					<div class="line no-border">退出登录</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	name: 't-layout-extra',
	components: {},
	props: {},
	data() {
		return {
			user: {
				avatar: 'data:image/jpeg;base64,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' // 头像
			}
		}
	},
	computed: {},
	watch: {},
	methods: {
		handleOperate(name) {

		}
	}
}
</script>

<style lang="scss">
	.v-layout-extra {
		position: fixed;
		top: 0;
		right: 30px;
		z-index: 1000;
		height: 55px;
	}
</style>
