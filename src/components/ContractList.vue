<template>
  	<div class="contract-list">
		<navbar title="Contract List"
				:isNavigate="true"
				:isBalance="true"
				:rightMenu="rightMenu"/>
		<div class="row">
			<div class="sidebar">
				<div class="vertical-progress">
					<div class="oval oval-top">
						<span>Start</span>
					</div>
					<div class="whole-line">
						<div class="selected-area"></div>
					</div>
					<div class="oval oval-bottom">
						<img src="../../static/img/infinity.svg" alt="" width="12px" height="6px">
					</div>
				</div>
			</div>
			<div class="col"></div>
		</div>
  	</div>
</template>

<script>
import Navbar from './layouts/Navbar'

export default {
	name: 'ContractList',
	components: {
		Navbar
	},
	data() {
		return {

		}
	}
}
</script>

<style lang="stylus">
	.contract-list
		background-color #f0f4fa
		height 100vh

		.row
			padding-top 132px
			display flex

			.sidebar
				width 25%
				display flex 
				flex-direction column
				align-items center

				.vertical-progress
					display flex
					flex-direction column
					position relative

					.whole-line
						width 36px
						height 516px
						background-image linear-gradient(to bottom, #e7eaee, #bcc5d1)
						border 1px solid #d2dae2

						.selected-area
							background-image linear-gradient(to bottom, #ffe082, #ffd24f)
							border solid 1px #ffd24f
							opacity 0.3
							height 312px
							margin-top 54px

					.oval
						position absolute
						width 36px
						height 36px
						background-image linear-gradient(to bottom, #525252, #222222)
						border-radius 50%
						display flex
						justify-content center
						align-items center

						&.oval-top
							top -18px

						span 
							font-family MuseoSansCyrl500
							color #fcfcfc
							font-size 9px
							text-transform uppercase

						&.oval-bottom
							bottom -18px

</style>


