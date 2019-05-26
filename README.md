# clientUI
闲余翻身微信小程序前端

### **安装（更新） wepy 命令行工具**。
	npm install wepy-cli -g

### **安装依赖包**
	npm install
### **开发实时编译**
    wepy build --watch
### **生产压缩**
	npm run build //上传代码时，请先执行此命令，否则会提示包体积过大

### **开发使用说明(重要)**

1、使用微信开发者工具-->添加项目，项目目录请选择dist目录。

2、微信开发者工具-->项目-->关闭ES6转ES5。 <font color=red>重要：漏掉此项会运行报错。</font> 

3、微信开发者工具-->项目-->关闭上传代码时样式自动补全。  <font color=red>重要：某些情况下漏掉此项也会运行报错。</font> 

4、微信开发者工具-->项目-->关闭代码压缩上传。  <font color=red>重要：开启后，会导致真机computed, props.sync 等等属性失效。</font> 

### **wepy开发文档地址**
	https://tencent.github.io/wepy/
### **目录结构**

    ├── src
        ├── app.wpy                 //入口文件
        ├── api                     //api接口
        ├── components              //自定义组件
        ├── images                  //图片文件夹
        ├── pages                   //页面
        │   ├── authorize.wpy       //授权页面
        |   ├── detail.wpy          //任务详情页面()
        |   ├── home.wpy            //首页，主界面
        |   ├── login.wpy           //登录页面
        |   ├── message.wpy         //消息页面 (未写)
        |   ├── profile.wpy         //我页面
        |   ├── register.wpy        //注册页面
        |   ├── search.wpy          //搜索页面
        ├── resource                //资源文件
        │   ├── iview               //iview组件
        ├── style                   //样式
        │   ├── weui.wxss           //weui样式文件
        │   ├── icon.less           //icon样式文件
        ├── utils                   //工具包
        │   ├── contant.js          //缓存常量定义文件    
    ├── package.json                //配置文件
    ├── wepy.config.js              //配置文件   

### **其他工具包**

1、 weui样式，参考 https://weui.io/ 以及 https://github.com/Tencent/weui

2、 iconfont图标，参考 https://www.iconfont.cn/， 使用方式参考 https://www.jianshu.com/p/67bbe4d95a85

