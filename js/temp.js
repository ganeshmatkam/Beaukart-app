AppData.saveProduct({
		prod_id:"2126",
		prod_name:"GreenBeau Saree",
		prod_desc:"beautiful green color narrow silk bordered saree",
		prod_price:2000,
		prod_stock:10,
		prod_cat:"Sarees"
		
	});
	
	saveProduct:function(product){
	var catObj=Parse.Object.extend("Products");
	
	catObj.save(product,{
	success: function(object){
		alert(" Products saved successfully!");
		},
	error: function(error){
		alert("ERROR: "+error.description);
	
	} 
	});
	
	}