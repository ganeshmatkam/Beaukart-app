angular.module('ionicApp', ['ionic'])

.factory("AppData",function($q){
	Parse.initialize("xJecl7wfn75gJngmLqt41D08I4JhM82oWJ4IY50O", "kIR9rHnAHkgfL1jJhozNpQSoPH8xD4wY3LVcUI0k");

	var products=[];
	var cats=[];

	return{
	getAllCats:function(){
		var dfrd=$q.defer();
		
		var catObj=Parse.Object.extend("Category");
		var qry=new Parse.Query(catObj);
		qry.startsWith("cat_id","c");
		qry.find({
			success:function(res){
				cats=res.map(function(obj){
					return {
						id:obj.get("cat_id"),
						name:obj.get("cat_name"),
						img:obj.get("cat_img"),
						desc:obj.get("cat_desc"),
						pid:obj.get("cat_pid")
						};
				});
				dfrd.resolve(cats);
			},
			error:function(error){
				alert(" Error connecting to server!");
			}
		});
		return dfrd.promise;
	},
	
	getAllProducts:function(){
		var dfrd=$q.defer();
		var catObj=Parse.Object.extend("Products");
		
		res=new catObj();
	//	res.save({prod_id:"c6",prod_imgs:["dfdfdfdf","ganesh"],prod_pid:"Sarees"});
		var qry=new Parse.Query(catObj);
		qry.notEqualTo("prod_id","");
		qry.find({
			success:function(res){
				products=res.map(function(obj){
					return {
						id:obj.get("prod_id"),
						name:obj.get("prod_name"),
						img1:obj.get("prod_img1"),
						cat:obj.get("prod_cat"),
						desc:obj.get("prod_desc"),
						cost:obj.get("prod_cost"),
						stock:obj.get("prod_stock"),
						ordlink:obj.get("prod_ordlink"),
						badge:obj.get("prod_badge"),
						extdet:obj.get("prod_extdet"),
						imgs:obj.get("prod_imgs")
					};
				});
				dfrd.resolve(products);
			},
			error:function(error){
				alert(" Error connecting to server!");
			}
		});
		return dfrd.promise;
	},	
	getPages:function(){
		var catProducts=[];
		var dfrd=$q.defer();
		var catObj=Parse.Object.extend("Pages");
		var qry=new Parse.Query(catObj);
		qry.notEqualTo("page_id",'');
		qry.find({
			success:function(res){
				catProducts=res.map(function(obj){
					return {
						id:obj.get("page_id"),
						title:obj.get("page_title"),
						content:obj.get("page_content"),
						imgs:obj.get("page_imgs"),
					};
				});
				dfrd.resolve(catProducts);
			},
			error:function(error){
				alert(" Error connecting to server!");
			}
		});
		return dfrd.promise;
	
	},	
	getProductsByCat:function(catId){
		var catProducts=[];
		var dfrd=$q.defer();
		var catObj=Parse.Object.extend("Products");
		var qry=new Parse.Query(catObj);
		qry.equalTo("prod_cat",catId);
		qry.find({
			success:function(res){
				catProducts=res.map(function(obj){
					return {
						id:obj.get("prod_id"),
						name:obj.get("prod_name"),
						img1:obj.get("prod_img1"),
						cat:obj.get("prod_cat"),
						desc:obj.get("prod_desc"),
						cost:obj.get("prod_cost"),
						stock:obj.get("prod_stock"),
						ordlink:obj.get("prod_ordlink"),
						badge:obj.get("prod_badge"),
						extdet:obj.get("prod_extdet"),
						imgs:obj.get("prod_imgs")
					};
				});
				dfrd.resolve(catProducts);
			},
			error:function(error){
				alert(" Error connecting to server!");
			}
		});
		return dfrd.promise;
	
	},	
	getProductById:function(productId){
		var products=[];
		var dfrd=$q.defer();
		var catObj=Parse.Object.extend("Products");
		var qry=new Parse.Query(catObj);
		qry.equalTo("prod_id",productId);
		qry.find({
			success:function(res){
				products=res.map(function(obj){
					return {
						id:obj.get("prod_id"),
						name:obj.get("prod_name"),
						img1:obj.get("prod_img1"),
						cat:obj.get("prod_cat"),
						desc:obj.get("prod_desc"),
						cost:obj.get("prod_cost"),
						stock:obj.get("prod_stock"),
						ordlink:obj.get("prod_ordlink"),
						badge:obj.get("prod_badge"),
						extdet:obj.get("prod_extdet"),
						imgs:obj.get("prod_imgs")
					};
				});
				
				dfrd.resolve(products[0]);
			},
			error:function(error){
				alert(" Error connecting to server!");
			}
		});
		return dfrd.promise;
	
	},
	getCatsByCat:function(catId){
		
		var cats=[];
		var dfrd=$q.defer();
		var catObj=Parse.Object.extend("Category");
		var qry=new Parse.Query(catObj);
		qry.equalTo("cat_pid",catId);
		qry.find({
			success:function(res){
				cats=res.map(function(obj){
					return {
						id:obj.get("cat_id"),
						name:obj.get("cat_name"),
						img:obj.get("cat_img"),
						desc:obj.get("cat_desc"),
						pid:obj.get("cat_pid")
						};
				});
				
				dfrd.resolve(cats);
			},
			error:function(error){
				alert(" Error connecting to server!");
			}
		});
		return dfrd.promise;
	
	}
}
})
.controller('DataCtrl', function($scope,AppData) {
	
	var allCats=function(){
		AppData.getAllCats().then(function(cats){
			$scope.cats=cats;
		});
	}
	var allProducts=function(){
		AppData.getAllProducts().then(function(products){
			$scope.products=products;
		
		});
	}
	allCats();
	allProducts();
	
	$scope.check="AJS is working";
  
})
.controller('ProductController', function($scope,$stateParams,AppData) {
	$scope.catId=$stateParams.catId;
	AppData.getProductsByCat($stateParams.catId).then(function(products){
		$scope.catProducts=products;
		var dpr=[];
		var k=0;
		for(var i=0;i<products.length;){
			var tmp=[];
			for(var j=0;j<3;j++){
				
				if(i<products.length){
				tmp[j]=products[i++];
				}
				else break;
				
			}
			dpr[k++]=tmp;
		
		}
		$scope.dpr=dpr;
	});
})
.controller('SingleProductController', function($scope,$stateParams,AppData) {
	AppData.getProductById($stateParams.productId).then(function(product){
		$scope.singleProduct=product;
		$scope.imgs=product.imgs;
		
	});
}) 
.controller('PageController', function($scope,$stateParams,AppData) {

	AppData.getPages().then(function(pages){
		$scope.pages=pages;		
		
	});
	
}) 

.controller('CatController', function($scope,$location,$stateParams,AppData) {


	AppData.getCatsByCat($stateParams.catId).then(function(ccats){
		$scope.childCats=ccats;
		if ($scope.childCats.length<=0 && $stateParams.catId=="c@talog"){
			
			AppData.getAllCats().then(function(cats){
				$scope.childCats=cats;
			});
			$scope.catTitle="Catalogue";
		}
		else if($scope.childCats.length<=0 && $stateParams.catId!="c@talog"){
			 $location.path("menu/tab/prodlist/"+$stateParams.catId);
			}
		
		else{
		$scope.catTitle=$scope.childCats[0].pid;
		}
			
	});
		
	
	
})  
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'MenuCtrl'
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "tabs.html"
        }
      }
    })
    .state('menu.tabs.buttons', {
      url: "/buttons",
      views: {
        'buttons-tab': {
          templateUrl: "buttons.html",
          controller: 'DataCtrl'
        }
      }
    })
    .state('menu.tabs.list', {
      url: "/list/:catId",
      views: {
        'list-tab': {
          templateUrl: "list.html",
          controller: 'CatController'
        }
      }
    })
	 .state('menu.tabs.prodlist', {
        url: "/prodlist/:catId",
      views: {
          'list-tab': {
            templateUrl: "prodlist.html",
			controller: 'ProductController'
        }
      }
    })
	.state('menu.tabs.single-product', {
        url: "/single-product/:productId",
      views: {
          'list-tab': {
            templateUrl: "single-product.html",
			controller: 'SingleProductController'
        }
      }
    })

    .state('menu.tabs.item', {
      url: "/item",
      views: {
          'item-tab': {
          templateUrl: "item.html"
        }
      }
    })
   .state('menu.tabs.exedash', {
       url: "/exedash",
       views: {
           'exedash-tab': {
               templateUrl: "exedash.html"
           }
       }
   })
    .state('menu.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "about.html"
		  
        }
      }
    });

  $urlRouterProvider.otherwise("menu/tab/buttons");

})

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
              
  $ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up'
  });
 })

  
 .controller('AppCtrl', function() {

  ionic.Platform.ready(function() {

  });

 });
              
              