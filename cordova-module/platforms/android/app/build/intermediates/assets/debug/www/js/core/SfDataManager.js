"use strict";
define(['mediator/mediator','json!../../json/dummyActivity.json'],function(m,dA){
	logger.info('Initializing SfDataManager');
	var mediator = new m();
	var taskList = [];
	var processRecords = function(records){
		var retList = [];
		if(records.length !== 0) {
			records.forEach(function(task){
				console.log(task);
				var newRec = {};
				newRec.Id = task.Id;
				newRec.accountId = task.Account.Id;
				newRec.accountName = task.Account.Name;
				newRec.shopOwner = task.shopOwner;
				newRec.lastPurchase = "2800";
				newRec.balanceDue = "500";
				newRec.todaysOrder = "1850";
				newRec.check = false;
				newRec.address = task.Account.BillingStreet + ' ' + task.Account.BillingCity;
				newRec.activityDate = task.ActivityDate;
				retList.push(newRec);
			});
		}
		return retList;
	}
	var getAllTask = function(success,error){
		if(taskList.length === 0) {
			//Bypass COde
			taskList = processRecords(dA);
			console.log(taskList);
			success(taskList);
			return;
		} else {
			success(taskList);
		}
	};

	var insertAttachment = function(rec,successCallback, errorCallback){
		client.client.create(
					'attachment',
					rec,
					function(r){
						successCallback(r);
					},
					function(r){
						errorCallback(r);
					});
	}

	return {
		mediator:mediator,
		getAllTask:getAllTask,
		insertAttachment:insertAttachment
	};
});