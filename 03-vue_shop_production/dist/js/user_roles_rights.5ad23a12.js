(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user_roles_rights"],{"057f":function(e,t,r){var n=r("fc6a"),a=r("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return a(e)}catch(t){return o.slice()}};e.exports.f=function(e){return o&&"[object Window]"==i.call(e)?s(e):a(n(e))}},"0858":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("权限管理")]),r("el-breadcrumb-item",[e._v("权限列表")])],1),r("el-card",[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rightsList,border:"",stripe:""}},[r("el-table-column",{attrs:{type:"index"}}),r("el-table-column",{attrs:{prop:"authName",label:"权限名称"}}),r("el-table-column",{attrs:{prop:"path",label:"路径"}}),r("el-table-column",{attrs:{prop:"level",label:"权限等级"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"===t.row.level?r("el-tag",[e._v("一级权限")]):e._e(),"1"===t.row.level?r("el-tag",{attrs:{type:"success"}},[e._v("二级权限")]):e._e(),"2"===t.row.level?r("el-tag",{attrs:{type:"warning"}},[e._v("三级权限")]):e._e()]}}])})],1)],1)],1)},a=[],i=(r("96cf"),r("1da1")),o={data:function(){return{rightsList:[]}},created:function(){this.getRightsList()},methods:{getRightsList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rights/list");case 2:if(r=t.sent,n=r.data,200===n.meta.status){t.next=7;break}return e.$message.error("用户权限列表获取失败"),t.abrupt("return");case 7:e.rightsList=n.data;case 8:case"end":return t.stop()}}),t)})))()}}},s=o,l=r("2877"),c=Object(l["a"])(s,n,a,!1,null,"487c9d0f",null);t["default"]=c.exports},2150:function(e,t,r){},"25f0":function(e,t,r){"use strict";var n=r("6eeb"),a=r("825a"),i=r("d039"),o=r("ad6d"),s="toString",l=RegExp.prototype,c=l[s],u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),d=c.name!=s;(u||d)&&n(RegExp.prototype,s,(function(){var e=a(this),t=String(e.source),r=e.flags,n=String(void 0===r&&e instanceof RegExp&&!("flags"in l)?o.call(e):r);return"/"+t+"/"+n}),{unsafe:!0})},"3ca3":function(e,t,r){"use strict";var n=r("6547").charAt,a=r("69f3"),i=r("7dd0"),o="String Iterator",s=a.set,l=a.getterFor(o);i(String,"String",(function(e){s(this,{type:o,string:String(e),index:0})}),(function(){var e,t=l(this),r=t.string,a=t.index;return a>=r.length?{value:void 0,done:!0}:(e=n(r,a),t.index+=e.length,{value:e,done:!1})}))},"4df4":function(e,t,r){"use strict";var n=r("0366"),a=r("7b0b"),i=r("9bdd"),o=r("e95a"),s=r("50c4"),l=r("8418"),c=r("35a1");e.exports=function(e){var t,r,u,d,f,m,p=a(e),g="function"==typeof this?this:Array,b=arguments.length,h=b>1?arguments[1]:void 0,v=void 0!==h,y=c(p),w=0;if(v&&(h=n(h,b>2?arguments[2]:void 0,2)),void 0==y||g==Array&&o(y))for(t=s(p.length),r=new g(t);t>w;w++)m=v?h(p[w],w):p[w],l(r,w,m);else for(d=y.call(p),f=d.next,r=new g;!(u=f.call(d)).done;w++)m=v?i(d,h,[u.value,w],!0):u.value,l(r,w,m);return r.length=w,r}},5895:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}})],1),r("el-card",{staticClass:"box-card"},[r("div",{staticStyle:{"margin-top":"15px"}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:15}},[r("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getUserList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getUserList},slot:"append"})],1)],1),r("el-col",{attrs:{span:5}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加用户")])],1)],1)],1)]),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.users,border:"",stripe:""}},[r("el-table-column",{attrs:{type:"index",label:"索引"}}),r("el-table-column",{attrs:{prop:"username",label:"用户"}}),r("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),r("el-table-column",{attrs:{prop:"mobile",label:"电话"}}),r("el-table-column",{attrs:{prop:"role_name",label:"角色"}}),r("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{on:{change:function(r){return e.userStateChange(t.row)}},model:{value:t.row.mg_state,callback:function(r){e.$set(t.row,"mg_state",r)},expression:"scope.row.mg_state"}})]}}])}),r("el-table-column",{attrs:{label:"操作",width:"250px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(r){return e.showEditDialog(t.row.id)}}}),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete"},on:{click:function(r){return e.removeUserByID(t.row.id)}}}),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"分配角色",placement:"top",enterable:!1}},[r("el-button",{attrs:{type:"warning",icon:"el-icon-setting"},on:{click:function(r){return e.setRole(t.row)}}})],1)]}}])})],1),r("el-dialog",{attrs:{title:"添加用户",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},close:e.addDialogClose}},[r("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"70px"}},[r("el-form-item",{attrs:{label:"用户名称",prop:"username"}},[r("el-input",{model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{model:{value:e.addForm.password,callback:function(t){e.$set(e.addForm,"password",t)},expression:"addForm.password"}})],1),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{model:{value:e.addForm.email,callback:function(t){e.$set(e.addForm,"email",t)},expression:"addForm.email"}})],1),r("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[r("el-input",{model:{value:e.addForm.mobile,callback:function(t){e.$set(e.addForm,"mobile",t)},expression:"addForm.mobile"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),r("el-dialog",{attrs:{title:"修改用户",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editDialogClose}},[r("el-form",{ref:"editFormRef",attrs:{model:e.editForm,rules:e.editFormRules,"label-width":"70px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{disabled:""},model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),r("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[r("el-input",{model:{value:e.editForm.mobile,callback:function(t){e.$set(e.editForm,"mobile",t)},expression:"editForm.mobile"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.validEditForm}},[e._v("确 定")])],1)],1),r("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[1,3,5,7],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),r("el-dialog",{attrs:{title:"分配角色",visible:e.setRoleDialogVisible,width:"50%"},on:{"update:visible":function(t){e.setRoleDialogVisible=t},close:e.setRoleDialogClosed}},[r("div",[r("p",[e._v("当前的用户："+e._s(e.userInfo.username))]),r("p",[e._v("当前的角色："+e._s(e.userInfo.role_name))]),r("p",[e._v(" 分配新角色: "),r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.selectedRoleId,callback:function(t){e.selectedRoleId=t},expression:"selectedRoleId"}},e._l(e.roleList,(function(e){return r("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})})),1)],1)]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.setRoleDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.saveRoleInfo}},[e._v("确 定")])],1)])],1)},a=[],i=(r("99af"),r("96cf"),r("1da1")),o={data:function(){var e=function(e,t,r){var n=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;if(n.test(t))return r();r(new Error("请输入正确的邮箱"))},t=function(e,t,r){var n=/^0?(13|14|15|18|17)[0-9]{9}/;if(n.test(t))return r();r(new Error("输入的手机号码有误"))};return{queryInfo:{query:"",pagenum:1,pagesize:2},users:[],total:0,dialogVisible:!1,editDialogVisible:!1,addForm:{username:"",password:"",email:"",mobile:""},addFormRules:{username:[{required:!0,message:"请输入用户名称",trigger:"blur"},{min:3,max:10,message:"用户名的长度在3-10个字符之间",trigger:"blur"}],password:[{required:!0,message:"请输入用户密码",trigger:"blur"},{min:6,max:15,message:"密码的长度在6-15个字符之间",trigger:"blur"}],mobile:[{required:!0,message:"请输入用户手机",trigger:"blur"},{required:!0,validator:t,trigger:"blur"}],email:[{required:!0,message:"请输入用户邮箱",trigger:"blur"},{required:!0,validator:e,trigger:"blur"}]},editForm:{},editFormRules:{mobile:[{required:!0,message:"请输入用户手机",trigger:"blur"},{required:!0,validator:t,trigger:"blur"}],email:[{required:!0,message:"请输入用户邮箱",trigger:"blur"},{required:!0,validator:e,trigger:"blur"}]},setRoleDialogVisible:!1,userInfo:{},roleList:[],selectedRoleId:""}},created:function(){this.getUserList()},methods:{getUserList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/users",{params:e.queryInfo});case 2:if(r=t.sent,n=r.data,200===n.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("用户列表数据获取失败"));case 6:e.users=n.data.users,e.total=n.data.total;case 8:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.queryInfo.pagesize=e,this.getUserList()},handleCurrentChange:function(e){this.queryInfo.pagenum=e,this.getUserList()},userStateChange:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("users/".concat(e.id,"/state/").concat(e.mg_state));case 2:if(n=r.sent,a=n.status,200===a){r.next=8;break}return t.userInfo.mg_state=!t.userInfo.mg_state,t.$messsage.error("用户状态修改失败"),r.abrupt("return");case 8:t.$message.success("用户状态修改成功");case 9:case"end":return r.stop()}}),r)})))()},addDialogClose:function(){this.$refs.addFormRef.resetFields()},addUser:function(){var e=this;this.$refs.addFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.post("/users",e.addForm);case 4:if(n=t.sent,a=n.data,201===a.meta.status){t.next=10;break}return e.$message.error("添加用户失败"),e.dialogVisible=!1,t.abrupt("return");case 10:e.$message.sunccess("添加成功");case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},showEditDialog:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.editDialogVisible=!0,r.next=3,t.$http.get("users/".concat(e));case 3:if(n=r.sent,a=n.data,200===a.meta.status){r.next=8;break}return t.$message.error("用户查询失败"),r.abrupt("return");case 8:t.editForm=a.data;case 9:case"end":return r.stop()}}),r)})))()},editDialogClose:function(){this.$refs.editFormRef.resetFields()},validEditForm:function(){var e=this;this.$refs.editFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.put("users/".concat(e.editForm.id),{email:e.editForm.email,mobile:e.editForm.mobile});case 4:if(n=t.sent,a=n.data,200===a.meta.status){t.next=9;break}return e.$message.error("用户信息修改失败"),t.abrupt("return");case 9:e.editDialogVisible=!1,e.getUserList(),e.$message.success("更新用户信息成功");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},removeUserByID:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(e){return e}));case 2:if(n=r.sent,"confirm"===n){r.next=5;break}return r.abrupt("return",t.$message.info("已经取消删除"));case 5:return r.next=7,t.$http.delete("users/".concat(e));case 7:if(a=r.sent,i=a.data,200===i.meta.status){r.next=12;break}return t.$message.error("用户删除失败"),r.abrupt("return");case 12:t.getUserList(),t.$message.success("用户删除成功");case 14:case"end":return r.stop()}}),r)})))()},setRole:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.get("roles");case 2:if(n=r.sent,a=n.data,200===a.meta.status){r.next=7;break}return t.$message.error("获取角色列表失败"),r.abrupt("return");case 7:t.roleList=a.data,t.userInfo=e,t.setRoleDialogVisible=!0;case 10:case"end":return r.stop()}}),r)})))()},saveRoleInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.selectedRoleId){t.next=3;break}return e.$message.error("请选择要分配的用户角色"),t.abrupt("return");case 3:return t.next=5,e.$http.put("users/".concat(e.userInfo.id,"/role"),{rid:e.selectedRoleId});case 5:r=t.sent,n=r.data,200!==n.meta.status&&e.$message.error("更新角色失败"),e.$message.success("更新角色成功"),e.getUserList(),e.setRoleDialogVisible=!1;case 11:case"end":return t.stop()}}),t)})))()},setRoleDialogClosed:function(){this.selectedRoleId="",this.userInfo=""}}},s=o,l=r("2877"),c=Object(l["a"])(s,n,a,!1,null,"341e19df",null);t["default"]=c.exports},"705b":function(e,t,r){"use strict";var n=r("2150"),a=r.n(n);a.a},"746f":function(e,t,r){var n=r("428f"),a=r("5135"),i=r("e538"),o=r("9bf2").f;e.exports=function(e){var t=n.Symbol||(n.Symbol={});a(t,e)||o(t,e,{value:i.f(e)})}},"9c30":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("权限管理")]),r("el-breadcrumb-item",[e._v("权限列表")])],1),r("el-card",[r("el-row",[r("el-col",[r("el-button",{attrs:{type:"primary"}},[e._v("添加角色")])],1)],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rolesList,border:"",stripe:""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.children,(function(n,a){return r("el-row",{key:n.id,class:["bdbottom",0===a?"bdtop":"","vcenter"]},[r("el-col",{attrs:{span:5}},[r("el-tag",{attrs:{closable:""},on:{close:function(r){return e.removeRightById(t.row,n.id)}}},[e._v(e._s(n.authName))]),r("i",{staticClass:"el-icon-caret-right"})],1),r("el-col",{attrs:{span:19}},e._l(n.children,(function(n,a){return r("el-row",{key:n.id,class:[0===a?"":"bdtop","vcenter"],attrs:{type:"flex"}},[r("el-col",{attrs:{span:6}},[r("el-tag",{attrs:{type:"success",closable:""},on:{close:function(r){return e.removeRightById(t.row,n.id)}}},[e._v(e._s(n.authName))]),r("i",{staticClass:"el-icon-caret-right"})],1),r("el-col",{attrs:{span:18}},e._l(n.children,(function(n){return r("el-tag",{key:n.id,attrs:{type:"warning",closable:""},on:{close:function(r){return e.removeRightById(t.row,n.id)}}},[e._v(e._s(n.authName))])})),1)],1)})),1)],1)}))}}])}),r("el-table-column",{attrs:{type:"index"}}),r("el-table-column",{attrs:{prop:"roleName",label:"角色名称"}}),r("el-table-column",{attrs:{prop:"roleDesc",label:"角色描述"}}),r("el-table-column",{attrs:{label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[r("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"}},[e._v("删除")]),r("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-setting"},on:{click:function(r){return e.showSetRightDialog(t.row)}}},[e._v("分配权限")])],1)]}}])})],1)],1),r("el-dialog",{attrs:{title:"可分配权限",visible:e.setRightDialogVisible},on:{"update:visible":function(t){e.setRightDialogVisible=t},close:e.setRightDialogClosed}},[r("el-tree",{ref:"treeRef",attrs:{data:e.rightsList,props:e.treeProps,"show-checkbox":"","node-key":"id","default-expand-all":!0,"default-checked-keys":e.defKeys}}),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.setRightDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.allotRights}},[e._v("确 定")])],1)],1)],1)},a=[];r("99af"),r("4160"),r("a15b"),r("159b");function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e){if(Array.isArray(e))return i(e)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("d3b7"),r("3ca3"),r("ddb0");function s(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}r("fb6a"),r("b0c0"),r("25f0");function l(e,t){if(e){if("string"===typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e){return o(e)||s(e)||l(e)||c()}r("96cf");var d=r("1da1"),f={data:function(){return{rolesList:[],setRightDialogVisible:!1,rightsList:[],treeProps:{label:"authName",children:"children"},defKeys:[],roleId:""}},created:function(){this.getRolesList()},methods:{getRolesList:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("roles");case 2:r=t.sent,n=r.data,200!==n.meta.status&&e.$message.error("角色列表获取失败！！"),e.rolesList=n.data;case 6:case"end":return t.stop()}}),t)})))()},removeRightById:function(e,t){var r=this;return Object(d["a"])(regeneratorRuntime.mark((function n(){var a,i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,r.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(e){return e}));case 2:if(a=n.sent,"confirm"===a){n.next=6;break}return r.$message.info("用户取消了删除操作"),n.abrupt("return");case 6:return n.next=8,r.$http.delete("roles/".concat(e.id,"/rights/").concat(t));case 8:if(i=n.sent,o=i.data,200===o.meta.status){n.next=13;break}return r.$message.error("删除权限失败"),n.abrupt("return");case 13:e.children=o.data;case 14:case"end":return n.stop()}}),n)})))()},showSetRightDialog:function(e){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.get("rights/tree");case 2:if(n=r.sent,a=n.data,200===a.meta.status){r.next=7;break}return t.$message.error("权限数据获取失败"),r.abrupt("return");case 7:t.rightsList=a.data,t.getLeafKeys(e,t.defKeys),t.roleId=e.id,t.setRightDialogVisible=!0;case 11:case"end":return r.stop()}}),r)})))()},getLeafKeys:function(e,t){var r=this;if(!e.children)return t.push(e.id);e.children.forEach((function(e){r.getLeafKeys(e,t)}))},setRightDialogClosed:function(){this.defKeys=[]},allotRights:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=[].concat(u(e.$refs.treeRef.getCheckedKeys()),u(e.$refs.treeRef.getHalfCheckedKeys())),t.next=3,e.$http.post("roles/".concat(e.roleId,"/rights"),{rids:r.join(",")});case 3:n=t.sent,a=n.data,200!==a.meta.status&&e.$message.error("分配用户权限失败"),e.$message.success("分配权限成功"),e.getRolesList(),e.setRightDialogVisible=!1;case 9:case"end":return t.stop()}}),t)})))()}}},m=f,p=(r("705b"),r("2877")),g=Object(p["a"])(m,n,a,!1,null,"e24530fa",null);t["default"]=g.exports},a4d3:function(e,t,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("d066"),o=r("c430"),s=r("83ab"),l=r("4930"),c=r("fdbf"),u=r("d039"),d=r("5135"),f=r("e8b5"),m=r("861d"),p=r("825a"),g=r("7b0b"),b=r("fc6a"),h=r("c04e"),v=r("5c6c"),y=r("7c73"),w=r("df75"),x=r("241c"),R=r("057f"),k=r("7418"),_=r("06cf"),$=r("9bf2"),S=r("d1e7"),F=r("9112"),I=r("6eeb"),O=r("5692"),D=r("f772"),j=r("d012"),C=r("90e3"),L=r("b622"),V=r("e538"),q=r("746f"),A=r("d44e"),E=r("69f3"),z=r("b727").forEach,U=D("hidden"),N="Symbol",P="prototype",B=L("toPrimitive"),K=E.set,T=E.getterFor(N),J=Object[P],Z=a.Symbol,M=i("JSON","stringify"),H=_.f,Q=$.f,W=R.f,G=S.f,X=O("symbols"),Y=O("op-symbols"),ee=O("string-to-symbol-registry"),te=O("symbol-to-string-registry"),re=O("wks"),ne=a.QObject,ae=!ne||!ne[P]||!ne[P].findChild,ie=s&&u((function(){return 7!=y(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(e,t,r){var n=H(J,t);n&&delete J[t],Q(e,t,r),n&&e!==J&&Q(J,t,n)}:Q,oe=function(e,t){var r=X[e]=y(Z[P]);return K(r,{type:N,tag:e,description:t}),s||(r.description=t),r},se=c?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof Z},le=function(e,t,r){e===J&&le(Y,t,r),p(e);var n=h(t,!0);return p(r),d(X,n)?(r.enumerable?(d(e,U)&&e[U][n]&&(e[U][n]=!1),r=y(r,{enumerable:v(0,!1)})):(d(e,U)||Q(e,U,v(1,{})),e[U][n]=!0),ie(e,n,r)):Q(e,n,r)},ce=function(e,t){p(e);var r=b(t),n=w(r).concat(pe(r));return z(n,(function(t){s&&!de.call(r,t)||le(e,t,r[t])})),e},ue=function(e,t){return void 0===t?y(e):ce(y(e),t)},de=function(e){var t=h(e,!0),r=G.call(this,t);return!(this===J&&d(X,t)&&!d(Y,t))&&(!(r||!d(this,t)||!d(X,t)||d(this,U)&&this[U][t])||r)},fe=function(e,t){var r=b(e),n=h(t,!0);if(r!==J||!d(X,n)||d(Y,n)){var a=H(r,n);return!a||!d(X,n)||d(r,U)&&r[U][n]||(a.enumerable=!0),a}},me=function(e){var t=W(b(e)),r=[];return z(t,(function(e){d(X,e)||d(j,e)||r.push(e)})),r},pe=function(e){var t=e===J,r=W(t?Y:b(e)),n=[];return z(r,(function(e){!d(X,e)||t&&!d(J,e)||n.push(X[e])})),n};if(l||(Z=function(){if(this instanceof Z)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=C(e),r=function(e){this===J&&r.call(Y,e),d(this,U)&&d(this[U],t)&&(this[U][t]=!1),ie(this,t,v(1,e))};return s&&ae&&ie(J,t,{configurable:!0,set:r}),oe(t,e)},I(Z[P],"toString",(function(){return T(this).tag})),I(Z,"withoutSetter",(function(e){return oe(C(e),e)})),S.f=de,$.f=le,_.f=fe,x.f=R.f=me,k.f=pe,V.f=function(e){return oe(L(e),e)},s&&(Q(Z[P],"description",{configurable:!0,get:function(){return T(this).description}}),o||I(J,"propertyIsEnumerable",de,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:Z}),z(w(re),(function(e){q(e)})),n({target:N,stat:!0,forced:!l},{for:function(e){var t=String(e);if(d(ee,t))return ee[t];var r=Z(t);return ee[t]=r,te[r]=t,r},keyFor:function(e){if(!se(e))throw TypeError(e+" is not a symbol");if(d(te,e))return te[e]},useSetter:function(){ae=!0},useSimple:function(){ae=!1}}),n({target:"Object",stat:!0,forced:!l,sham:!s},{create:ue,defineProperty:le,defineProperties:ce,getOwnPropertyDescriptor:fe}),n({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:me,getOwnPropertySymbols:pe}),n({target:"Object",stat:!0,forced:u((function(){k.f(1)}))},{getOwnPropertySymbols:function(e){return k.f(g(e))}}),M){var ge=!l||u((function(){var e=Z();return"[null]"!=M([e])||"{}"!=M({a:e})||"{}"!=M(Object(e))}));n({target:"JSON",stat:!0,forced:ge},{stringify:function(e,t,r){var n,a=[e],i=1;while(arguments.length>i)a.push(arguments[i++]);if(n=t,(m(t)||void 0!==e)&&!se(e))return f(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!se(t))return t}),a[1]=t,M.apply(null,a)}})}Z[P][B]||F(Z[P],B,Z[P].valueOf),A(Z,N),j[U]=!0},a630:function(e,t,r){var n=r("23e7"),a=r("4df4"),i=r("1c7e"),o=!i((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:o},{from:a})},b0c0:function(e,t,r){var n=r("83ab"),a=r("9bf2").f,i=Function.prototype,o=i.toString,s=/^\s*function ([^ (]*)/,l="name";n&&!(l in i)&&a(i,l,{configurable:!0,get:function(){try{return o.call(this).match(s)[1]}catch(e){return""}}})},d28b:function(e,t,r){var n=r("746f");n("iterator")},ddb0:function(e,t,r){var n=r("da84"),a=r("fdbc"),i=r("e260"),o=r("9112"),s=r("b622"),l=s("iterator"),c=s("toStringTag"),u=i.values;for(var d in a){var f=n[d],m=f&&f.prototype;if(m){if(m[l]!==u)try{o(m,l,u)}catch(g){m[l]=u}if(m[c]||o(m,c,d),a[d])for(var p in i)if(m[p]!==i[p])try{o(m,p,i[p])}catch(g){m[p]=i[p]}}}},e01a:function(e,t,r){"use strict";var n=r("23e7"),a=r("83ab"),i=r("da84"),o=r("5135"),s=r("861d"),l=r("9bf2").f,c=r("e893"),u=i.Symbol;if(a&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof f?new u(e):void 0===e?u():u(e);return""===e&&(d[t]=!0),t};c(f,u);var m=f.prototype=u.prototype;m.constructor=f;var p=m.toString,g="Symbol(test)"==String(u("test")),b=/^Symbol\((.*)\)[^)]+$/;l(m,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=p.call(e);if(o(d,e))return"";var r=g?t.slice(7,-1):t.replace(b,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:f})}},e538:function(e,t,r){var n=r("b622");t.f=n},fb6a:function(e,t,r){"use strict";var n=r("23e7"),a=r("861d"),i=r("e8b5"),o=r("23cb"),s=r("50c4"),l=r("fc6a"),c=r("8418"),u=r("b622"),d=r("1dde"),f=r("ae40"),m=d("slice"),p=f("slice",{ACCESSORS:!0,0:0,1:2}),g=u("species"),b=[].slice,h=Math.max;n({target:"Array",proto:!0,forced:!m||!p},{slice:function(e,t){var r,n,u,d=l(this),f=s(d.length),m=o(e,f),p=o(void 0===t?f:t,f);if(i(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?a(r)&&(r=r[g],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return b.call(d,m,p);for(n=new(void 0===r?Array:r)(h(p-m,0)),u=0;m<p;m++,u++)m in d&&c(n,u,d[m]);return n.length=u,n}})}}]);
//# sourceMappingURL=user_roles_rights.5ad23a12.js.map