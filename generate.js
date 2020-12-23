var fs = require('fs')
var uuid = require('uuid/v1')

var length = 1000
console.log('start...')
// var conversation_id = 'e9a3e2d3-e705-3c0b-8ee0-7b6d11193450'
var conversation_id = '10a3a878-840a-4782-b238-83007957524c'
var user_id1 = '639ec50a-d4f1-4135-8624-3c71189dcdcc'
var user_id2 = '4e0e6e6b-6c9d-4e99-b7f1-1356322abec3'
var file = 'new.sql'

fs.unlink(file, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('delete')
    }
})
console.log(new Date())
var start = `BEGIN TRANSACTION;
INSERT INTO messages (message_id,conversation_id,user_id,category,content,media_url,media_mime_type,media_size,media_duration,media_width,media_height,media_hash,thumb_image,media_key,media_digest,media_status,status,created_at,action,participant_id,snapshot_id,hyperlink,name,album_id,sticker_id,shared_user_id,media_waveform,quote_message_id,quote_content) VALUES \n`
fs.appendFileSync(file, start, function (err) {
    if (err) {
        console.log(err)
    } else {

    }
})
for (var i = 0; i < length; i++) {
    var id = uuid()
    var created_at = new Date().toISOString()
    var end = ','
    if (i == length - 1) {
        end = ';'
    }
    var content = `测试消息-No.${i}`
    var user_id = user_id1
    if (i % 2 == 0) {
        user_id = user_id2
    }
    var sql = `('${id}', '${conversation_id}','${user_id}', 'SIGNAL_TEXT', '${content}', NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL, 'READ', '${created_at}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)${end}\n`
    fs.appendFileSync(file, sql, function (err) {
        if (err) {
            console.log(err)
        } else {

        }
    })
}

fs.appendFileSync(file, 'COMMIT;', function (err) {
    if (err) {
        console.log(err)
    } else {

    }
})