<template>
	<div class="v-tpl-form g-pd-lr-24 g-pd-t-24" style="padding-bottom: 70px">
		<!-- 表单 -->
		<div class="g-m-b-32">
			<h3 class="g-m-b-24">表单样式</h3>
			<!-- 96位所有label中最宽的长度 -->
			<el-form
				ref="form"
				:model="formValidate"
				:rules="ruleValidate"
				:label-width="96"
				class="g-pd-l-56 g-m-t-21"
				position="left"
				@submit.native.prevent
			>
				<el-form-item label="商品名称：" prop="product_name">
					<el-input
						v-model="formValidate.product_name"
						class="v-input"
						placeholder="请输入"
						style="width: 300px"
					/>
				</el-form-item>
				<div class="g-flex g-m-b-26">
					<div class="g-c-333 g-tr" style="width: 96px">商品名称：</div>
					<div class="g-c-999">安徽省电话费</div>
				</div>
				<!-- <el-form-item label="商品主图：" prop="original_img" >
					<el-imgs-picker class="g-m-t-26" />
				</el-form-item> -->
				<el-form-item label="商品货号：" prop="product_sn">
					<el-input
						v-model="formValidate.product_sn"
						placeholder="请输入"
						style="width: 300px"
					/>
				</el-form-item>
				<el-form-item label="商品实际价格：" prop="contact">
					<el-input
						v-model="formValidate.contact"
						placeholder="请填写合同签订公司"
						style="width: 300px"
					/>
				</el-form-item>
				<el-form-item label="商品市场价格：" prop="market_price">
					<el-input
						v-model="formValidate.market_price"
						placeholder="请填写合同签订公司"
						style="width: 300px"
					/>
				</el-form-item>
				<el-form-item label="商品重量：" prop="weight">
					<el-input
						v-model="formValidate.weight"
						placeholder="请填写合同签订公司"
						style="width: 300px"
					/>
				</el-form-item>
				<el-form-item label="商品分类：" prop="my_company">
					<el-select
						v-model="formValidate.my_company"
						clearable
						transfer
						placeholder="请选择我方合同公司"
						style="width: 300px"
					>
						<el-option
							v-for="(item, index) in company"
							:key="index"
							value="item"
						>
							{{ item }}
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品属性组：" prop="my_company">
					<el-select
						v-model="formValidate.my_company"
						clearable
						transfer
						placeholder="请选择我方合同公司"
						style="width: 300px"
					>
						<el-option
							v-for="(item, index) in company"
							:key="index"
							value="item"
						>
							{{ item }}
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					v-for="(item, index) in formValidate.items"
					:key="item.index"
					:label="index === 0 ? '缴款方式：' : ''"
				>
					<div class="g-form-block">
						<el-form-item
							:prop="'items.' + index + '.date'"
							:rules="{required: true, message: '请选择成交时间'}"
						>
							<el-date-picker
								v-model="item.date"
								style="width: 300px"
								type="datetime"
								placeholder="请选择成交时间"
							/>
						</el-form-item>
						<el-form-item
							:prop="'items.' + index + '.amount'"
							:rules="{required: true, message: '请输入付款金额'}"
						>
							<el-input-number
								v-model="item.amount"
								:min="0"
								:precision="2"
								style="width: 300px"
								placeholder="请输入付款金额"
							/>
						</el-form-item>
						<el-form-item
							:prop="'items.' + index + '.imgs'"
							:rules="{required: true, message: '请选择图片'}"
							style="margin-bottom: 0px !important"
						>
							<el-imgs-picker
								v-model="item.imgs"
								style="width: 300px"
							/>
							<span
								class="g-m-t-5 g-inline-block"
								@click="handleDel(item.index)"
							>
								删除
							</span>
						</el-form-item>
					</div>
				</el-form-item>
				<el-form-item label="">
					<el-button type="primary" @click="handleAdd">
						+新建
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 展示 -->
		<div class="g-m-b-32">
			<h3 class="g-m-b-24">弹框内上下边距16px</h3>
			<!-- 小弹框居中 |  中弹框距离左侧120 | 大弹框24，有进度条的距离左侧24-->
			<div class="g-pd-l-56">
				<div class="g-flex g-m-b-16">
					<div class="g-c-333">商品名称：</div>
					<div class="g-c-51">安徽省电话费</div>
				</div>
				<div class="g-flex g-m-b-16">
					<div class="g-c-333">商品名称：</div>
					<div class="g-c-51">安徽省电话费</div>
				</div>
				<div class="g-flex g-m-b-16">
					<div class="g-c-333">商品名称：</div>
					<div class="g-c-51">安徽省电话费</div>
				</div>
				<div class="g-flex g-m-b-16">
					<div class="g-c-333">商品名称：</div>
					<div class="g-c-51">安徽省电话费</div>
				</div>
				<div class="g-flex g-m-b-16">
					<div class="g-c-333">商品名称：</div>
					<div class="g-c-51">安徽省电话费</div>
				</div>
			</div>
		</div>
		<tpl-footer
			@cancel="$router.back()"
			@ok="handleSubmit"
		/>
	</div>
</template>

<script>
import Footer from '@common/footer/footer'

export default {
	name: 'v-tpl-form',
	components: {
		'tpl-footer': Footer
	},
	data() {
		return {
			company: ['阿里', '有赞', '网易', '滴滴'],
			index: 1,
			setShow: false,
			formValidate: {
				product_name: 'xxxxx',
				product_sn: '',
				original_img: '',
				weight: '',
				items: [
					{
						index: 1,
						date: '',
						pay_type: [],
						amount: null,
						imgs: []
					}
				]
			},
			ruleValidate: {
				product_name: [
					{
						required: true,
						message: '商品名称必须填写，最多100个字'
					}
				],
				product_sn: [
					{
						required: true,
						message: '商品货号必须填写，且不能超过64个字符'
					}
				],
				original_img: [
					{
						required: true,
						message: '最少添加一张商品图片'
					}
				],
				contact: [
					{
						required: true,
						message: '商品价格为不能超过7个字符的正数，且不能超过小数点后两位'
					}
				],
				weight: [
					{
						required: true,
						message: '商品重量为不能超过9个字符的正整数',
						trigger: 'change'
					}
				],

			}
		}
	},
	methods: {
		handleAdd() {
			this.index++
			this.formValidate.items.push({
				index: this.index,
				date: '',
				pay_type: [],
				amount: null
			})
		},
		handleDel(index) {
			this.formValidate.items = this.formValidate.items.filter((item) => {
				return item.index !== index
			})
		},
		handleSubmit(name) {
			this.$refs.form.validate().then(() => {}).catch((err) => { console.log(err) })
		},
		handleSet() {
			this.setShow = !this.setShow
			return this.setShow
		},
	},
}
</script>

<style lang="scss">
</style>
