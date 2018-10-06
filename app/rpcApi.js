var utils = require("./utils.js");

var genesisCoinbaseTransactionTxid = "2f143435cd7d80fe1cc95cea276d6897a86c80ec113d4e627ff4724bf0583dc1";
var genesisCoinbaseTransaction = {
    "hash":"130df13ce210c921e1f8a1b707fae519ce1427073bc850d794ac010c0ff7a3a5",
    "confirmations": 13254,
    "strippedsize": 307,
    "size": 307,
    "weight": 1228,
    "height": 0,
    "version": 1,
    "versionHex": "00000001",
    "merkleroot": "2f143435cd7d80fe1cc95cea276d6897a86c80ec113d4e627ff4724bf0583dc1",
    "tx": [
			 "2f143435cd7d80fe1cc95cea276d6897a86c80ec113d4e627ff4724bf0583dc1"
		  ],
    "time": 1518537600,
    "mediantime": 1518537600,
    "nonce": 2016310,
    "bits": "1e0ffff0",
    "difficulty": 0.000244140625,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000100010",
    "nextblockhash": "c3879ff7fce6b9e80ca36b4978a7f627d2a16b1b7d050dddb1f03e9b0f5362f0"
};



function getBlockchainInfo() {
	return new Promise(function(resolve, reject) {
		client.cmd('getblockchaininfo', function(err, result, resHeaders) {
			if (err) {
				console.log("Error 3207fh0f: " + err);

				reject(err);

				return;
			}
			resolve(result);
		});
	});
}

function getNetworkInfo() {
	return new Promise(function(resolve, reject) {
		client.cmd('getnetworkinfo', function(err, result, resHeaders) {
			if (err) {
				console.log("Error 239r7ger7gy: " + err);

				reject(err);

				return;
			}

			resolve(result);
		});
	});
}

function getMempoolInfo() {
	return new Promise(function(resolve, reject) {
		client.cmd('getmempoolinfo', function(err, result, resHeaders) {
			if (err) {
				console.log("Error 23407rhwe07fg: " + err);

				reject(err);

				return;
			}

			resolve(result);
		});
	});
}

function getUptimeSeconds() {
	return new Promise(function(resolve, reject) {
		client.cmd('uptime', function(err, result, resHeaders) {
			if (err) {
				console.log("Error 3218y6gr3986sdd: " + err);

				reject(err);

				return;
			}

			resolve(result);
		});
	});
}

function getMempoolStats() {
	return new Promise(function(resolve, reject) {
		client.cmd('getrawmempool', true, function(err, result, resHeaders) {
			if (err) {
				console.log("Error 428thwre0ufg: " + err);

				reject(err);

				return;
			}

			var compiledResult = {};

			compiledResult.count = 0;
			compiledResult.fee_0_5 = 0;
			compiledResult.fee_6_10 = 0;
			compiledResult.fee_11_25 = 0;
			compiledResult.fee_26_50 = 0;
			compiledResult.fee_51_75 = 0;
			compiledResult.fee_76_100 = 0;
			compiledResult.fee_101_150 = 0;
			compiledResult.fee_151_max = 0;

			compiledResult.totalfee_0_5 = 0;
			compiledResult.totalfee_6_10 = 0;
			compiledResult.totalfee_11_25 = 0;
			compiledResult.totalfee_26_50 = 0;
			compiledResult.totalfee_51_75 = 0;
			compiledResult.totalfee_76_100 = 0;
			compiledResult.totalfee_101_150 = 0;
			compiledResult.totalfee_151_max = 0;

			var totalFee = 0;
			for (var txid in result) {
				var txMempoolInfo = result[txid];
				totalFee += txMempoolInfo.modifiedfee;

				var feeRate = Math.round(txMempoolInfo.modifiedfee * 100000000 / txMempoolInfo.size);

				if (feeRate <= 5) {
					compiledResult.fee_0_5++;
					compiledResult.totalfee_0_5 += txMempoolInfo.modifiedfee;

				} else if (feeRate <= 10) {
					compiledResult.fee_6_10++;
					compiledResult.totalfee_6_10 += txMempoolInfo.modifiedfee;

				} else if (feeRate <= 25) {
					compiledResult.fee_11_25++;
					compiledResult.totalfee_11_25 += txMempoolInfo.modifiedfee;

				} else if (feeRate <= 50) {
					compiledResult.fee_26_50++;
					compiledResult.totalfee_26_50 += txMempoolInfo.modifiedfee;

				} else if (feeRate <= 75) {
					compiledResult.fee_51_75++;
					compiledResult.totalfee_51_75 += txMempoolInfo.modifiedfee;

				} else if (feeRate <= 100) {
					compiledResult.fee_76_100++;
					compiledResult.totalfee_76_100 += txMempoolInfo.modifiedfee;

				} else if (feeRate <= 150) {
					compiledResult.fee_101_150++;
					compiledResult.totalfee_101_150 += txMempoolInfo.modifiedfee;

				} else {
					compiledResult.fee_151_max++;
					compiledResult.totalfee_151_max += txMempoolInfo.modifiedfee;
				}

				compiledResult.count++;
			}

			compiledResult.totalFee = totalFee;

			resolve(compiledResult);
		});
	});
}

function getBlockByHeight(blockHeight) {
	console.log("getBlockByHeight: " + blockHeight);
	if(blockHeight == 0)
    {
        resolve({ success:true, getblockhash:"130df13ce210c921e1f8a1b707fae519ce1427073bc850d794ac010c0ff7a3a5", getblock:genesisCoinbaseTransaction });
    }else
    {
        return new Promise(function(resolve, reject) {
            var client = global.client;

            client.cmd('getblockhash', blockHeight, function(err, result, resHeaders) {
                if (err) {
                    console.log("Error 0928317yr3w: " + err);
                    reject(err);
                    return;
                }
                client.cmd('getblock', result, function(err2, result2, resHeaders2) {
                    if (err2) {
                        console.log("Error 320fh7e0hg: " + err2);

                        reject(err2);

                        return;
                    }

                    console.log({ success:true, getblockhash:result, getblock:result2 });
                    resolve({ success:true, getblockhash:result, getblock:result2 });
                });
            });
        });
    }
}

function getBlocksByHeight(blockHeights) {
	console.log("getBlocksByHeight: " + blockHeights);

	return new Promise(function(resolve, reject) {
		var batch = [];
		for (var i = 0; i < blockHeights.length; i++) {
			batch.push({
				method: 'getblockhash',
				params: [ blockHeights[i] ]
			});
		}

		var blockHashes = [];
		client.cmd(batch, function(err, result, resHeaders) {
			blockHashes.push(result);

			if (blockHashes.length == batch.length) {
				var batch2 = [];
				for (var i = 0; i < blockHashes.length; i++) {
					batch2.push({
						method: 'getblock',
						params: [ blockHashes[i] ]
					});
				}

				var blocks = [];
				client.cmd(batch2, function(err2, result2, resHeaders2) {
					if (err2) {
						console.log("Error 138ryweufdf: " + err2);
					}

					blocks.push(result2);
					if (blocks.length == batch2.length) {
						resolve(blocks);
					}
				});
			}
		});
	});
}

function getBlockByHash(blockHash) {
	console.log("getBlockByHash: " + blockHash);

	return new Promise(function(resolve, reject) {
		var client = global.client;
		
		client.cmd('getblock', blockHash, function(err, result, resHeaders) {
			if (err) {
				console.log("Error 0u2fgewue: " + err);

				reject(err);

				return;
			}
            console.log(result);
			resolve(result);
		});
	});
}

function getTransactionInputs(rpcClient, transaction, inputLimit=0) {
	console.log("getTransactionInputs: " + transaction.txid);

	return new Promise(function(resolve, reject) {
		var txids = [];
		for (var i = 0; i < transaction.vin.length; i++) {
			if (i < inputLimit || inputLimit == 0) {
				txids.push(transaction.vin[i].txid);
			}
		}

		getRawTransactions(txids).then(function(inputTransactions) {
			resolve({ txid:transaction.txid, inputTransactions:inputTransactions });
		});
	});
}

function getRawTransaction(txid) {
	return new Promise(function(resolve, reject) {
		if (txid == genesisCoinbaseTransactionTxid) {
			getBlockByHeight(0).then(function(blockZeroResult) {
				var result = genesisCoinbaseTransaction;
				result.confirmations = blockZeroResult.getblock.confirmations;

				resolve(result);
			});
			
			return;
		}

		client.cmd('getrawtransaction', txid, 1, function(err, result, resHeaders) {
			if (err) {
				console.log("Error 329813yre823: " + err);

				reject(err);

				return;
			}

			resolve(result);
		});
	});
}

function getRawTransactions(txids) {
	console.log("getRawTransactions: " + txids);

	return new Promise(function(resolve, reject) {
		if (!txids || txids.length == 0) {
			resolve([]);

			return;
		}

		if (txids.length == 1 && txids[0] == "2f143435cd7d80fe1cc95cea276d6897a86c80ec113d4e627ff4724bf0583dc1") {
			// copy the "confirmations" field from genesis block to the genesis-coinbase tx
			getBlockByHeight(0).then(function(blockZeroResult) {
				var result = genesisCoinbaseTransaction;
				result.confirmations = blockZeroResult.getblock.confirmations;

				resolve([result]);

			}).catch(function(err) {
				reject(err);

				return;
			});

			return;
		}

		var requests = [];
		for (var i = 0; i < txids.length; i++) {
			var txid = txids[i];
			
			if (txid) {
				requests.push({
					method: 'getrawtransaction',
					params: [ txid, 1 ]
				});
			}
		}

		var requestBatches = utils.splitArrayIntoChunks(requests, 20);

		executeBatchesSequentially(requestBatches, function(results) {
			resolve(results);
		});
	});
}

function executeBatchesSequentially(batches, resultFunc) {
	var batchId = utils.getRandomString(20, 'aA#');

	console.log("Starting " + batches.length + "-item batch " + batchId + "...");

	executeBatchesSequentiallyInternal(batchId, batches, 0, [], resultFunc);
}

function executeBatchesSequentiallyInternal(batchId, batches, currentIndex, accumulatedResults, resultFunc) {
	if (currentIndex == batches.length) {
		console.log("Finishing batch " + batchId + "...");

		resultFunc(accumulatedResults);

		return;
	}

	console.log("Executing item #" + (currentIndex + 1) + " (of " + batches.length + ") for batch " + batchId);

	var count = batches[currentIndex].length;

	client.cmd(batches[currentIndex], function(err, result, resHeaders) {
		if (err) {
			console.log("Error f83024hf4: " + err);
		}

		accumulatedResults.push(result);

		count--;

		if (count == 0) {
			executeBatchesSequentiallyInternal(batchId, batches, currentIndex + 1, accumulatedResults, resultFunc);
		}
	});
}

function getBlockData(rpcClient, blockHash, txLimit, txOffset)
{
	console.log("getBlockData: " + blockHash);

    if(blockHash == "130df13ce210c921e1f8a1b707fae519ce1427073bc850d794ac010c0ff7a3a5")
    {
        return new Promise(function(resolve, reject)
        {
            resolve({ getblock:genesisCoinbaseTransaction, transactions:[], txInputsByTransaction:genesisCoinbaseTransactionTxid });
        });
    }else
    {
        return new Promise(function(resolve, reject)
        {
            client.cmd('getblock', blockHash, function(err2, result2, resHeaders2)
            {
                if (err2) {
                    console.log("Error 3017hfwe0f: " + err2);

                    reject(err2);

                    return;
                }

                var txids = [];
                for (var i = txOffset; i < Math.min(txOffset + txLimit, result2.tx.length); i++)
                {
                    txids.push(result2.tx[i]);
                }

                getRawTransactions(txids).then(function(transactions) {
                    var txInputsByTransaction = {};

                    var promises = [];
                    for (var i = 0; i < transactions.length; i++) {
                        var transaction = transactions[i];

                        if (transaction) {
                            promises.push(getTransactionInputs(client, transaction, 10));
                        }
                    }

                    Promise.all(promises).then(function() {
                        var results = arguments[0];
                        for (var i = 0; i < results.length; i++) {
                            var resultX = results[i];

                            txInputsByTransaction[resultX.txid] = resultX.inputTransactions;
                        }

                        resolve({ getblock:result2, transactions:transactions, txInputsByTransaction:txInputsByTransaction });
                    });
                });
            });
        });
    }


}

module.exports = {
	getBlockchainInfo: getBlockchainInfo,
	getNetworkInfo: getNetworkInfo,
	getMempoolInfo: getMempoolInfo,
	getBlockByHeight: getBlockByHeight,
	getBlocksByHeight: getBlocksByHeight,
	getBlockByHash: getBlockByHash,
	getTransactionInputs: getTransactionInputs,
	getBlockData: getBlockData,
	getRawTransaction: getRawTransaction,
	getRawTransactions: getRawTransactions,
	getMempoolStats: getMempoolStats,
	getUptimeSeconds: getUptimeSeconds
};