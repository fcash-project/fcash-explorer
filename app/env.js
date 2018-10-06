module.exports = {
	cookiePassword: "0x232ace55f48def20f829e563e21af9ab0c2303bf1f603c8d2cb4693efa73bce7",
	debug: false,

	// Uncomment "bitcoind" below to automatically connect via RPC.
	// Otherwise, you can manually connect via the UI.

	bitcoind:{
		host:"127.0.0.1",
		port:9527,
		rpc: {
			username:"fcashuser",
			password:"fcashpass",
		},
	},
};