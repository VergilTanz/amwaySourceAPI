const functions = require('@google-cloud/functions-framework');
const mysql = require('mysql')

functions.http('helloHttp', (req, res) => {
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log('This is for helloHttp logging purpose')
    console.log(req.body)
    console.log('-------------------------------------')

    const pool = mysql.createPool({
        connectionLimit: 1,
        host: '104.197.196.36',
        port: '3306',
        user: 'root',
        database: 'source'
    })

    res.set('Access-Control-Allow-Origin', '*')

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        // res.set('Access-Control-Allow-Methods', 'GET');
        // res.set('Access-Control-Allow-Headers', 'Content-Type');
        // res.set('Access-Control-Max-Age', '3600');
        // res.status(204).send('Hello World with Options 2');
    } else {
        if (req.body === undefined) {
            res.send(JSON.stringify({
                status: 'error',
                data: 'missing inputs'
            }));
        }

        const values = {
            productNumber: `${req.body.skuPrefix}${req.body.skuRoot}${req.body.skuSuffix}`,
            email: req.body.email,
            percentage: req.body.percentage,
            effectiveDate: req.body.effectiveDate,
            productStatus: req.body.status,
            effectiveTime: req.body.effectiveTime,
            userPassword: req.body.password,
            businessLine: req.body.businessLine,
            productCategory: req.body.productCategory,
            productSubCategory: req.body.productSubCategory
        }

        const query = `INSERT INTO Example
        (productNumber, email, percentage, effectiveDate, productStatus, effectiveTime, userPassword, businessLine, productCategory, productSubCategory)
        VALUES (
            "${values.productNumber}",
            "${values.email}",
            "${values.percentage}",
            "${values.effectiveDate}",
            "${values.productStatus}",
            "${values.effectiveTime}",
            "${values.userPassword}",
            "${values.businessLine}",
            "${values.productCategory}",
            "${values.productSubCategory}")`

        pool.query(`select * from Example where productNumber = '${values.productNumber}'`, (error, results) => {
            if (results !== undefined && results.length > 0) {
                res.send(JSON.stringify({
                    status: 'duplicated',
                    data: results
                }));
            } else {
                pool.query(query, (error, results) => {
                    console.log('inserting data...')
                    console.log(error)
                    if (error) {
                        res.send(JSON.stringify({
                            status: 'error',
                            data: error
                        }))
                    } else {
                        res.send(JSON.stringify({
                            status: 'success',
                            data: 'Data insert succesfully'
                        }));
                    }
                })
            }
        })
    }
});