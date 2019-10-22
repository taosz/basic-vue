<template>
	<el-form
		ref="form"
		:model="formValidate"
		:rules="ruleValidate"
		label-width="120px"
		style="height: 100vh"
		class="g-flex-cc g-fd-c"
	>
		<el-form-item label="用户名:" prop="user">
			<el-input
				v-model="formValidate.user"
				placeholder="请输入用户名"
			/>
		</el-form-item>
		<el-form-item label="密码:" prop="password">
			<el-input
				v-model="formValidate.password"
				placeholder="请输入密码"
			/>
		</el-form-item>

		<el-button @click="handleLogin">登录</el-button>
	</el-form>
</template>

<script>
import { mapState } from 'vuex'
import { createLoginAuth } from '@routers/hooks'

export default {
	name: 'login',
	components: {},
	data() {
		return {
			formValidate: {
				user: '',
				password: ''
			},
			ruleValidate: {
				user: [
					{
						required: true,
						message: '请输入用户名'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码'
					}
				]
			}
		}
	},
	computed: {
		...mapState(['loginMain'])
	},
	created() {

	},
	methods: {
		handleLogin() {
			this.$refs.form.validate((isValid) => {
				if (!isValid) return
				this.request({
					url: 'LOGIN_MAIN_POST',
					type: 'POST',
					localData: {
						status: 1,
						data: {
							...this.formValidate
						}
					}
				})
					.then((res) => {
						this.$message.success(`登录成功 - userName: ${this.loginMain.user}`)

						createLoginAuth(res.data)
					})
					.catch((res) => {
						console.log(res)
					})
			})
		}
	}
}
</script>

<style lang="scss">
</style>
