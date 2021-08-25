let serverConfig = {
	envType: 'prod',	// test 测试  prod 正式
	host: 'https://dev2.jyhk.com',
	appId: 'wx5b2faedd920ffc3a',
	oid: 1
}

serverConfig = {
	// 测试环境
	baseUrl: `${serverConfig.host}/ecp-manage-sys`, //
	// 账号-加密解密-appToken
	appId: "narihealth-app-web",
	secret: "vod0l839k189221bd8hwyplbujsclz82",
	key: "450vu3c3l169ixbi",
	iv: "txcxpv1df8bvepo7",
	...serverConfig
}

export default serverConfig
