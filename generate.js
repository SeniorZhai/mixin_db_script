var fs = require('fs')
var uuid = require('uuid/v1')

var length = 99999
console.log('start...')
var conversation_id = '10a3a878-840a-4782-b238-83007957524c'
var user_id = '639ec50a-d4f1-4135-8624-3c71189dcdcc'
var file = 'new.sql'

var start = `BEGIN TRANSACTION;
INSERT INTO messages (id,conversation_id,user_id,category,content,media_url,media_mime_type,media_size,media_duration,media_width,media_height,media_hash,thumb_image,media_key,media_digest,media_status,status,created_at,action,participant_id,snapshot_id,hyperlink,name,album_id,sticker_id,shared_user_id,media_waveform,media_mine_type,quote_message_id,quote_content) VALUES \n`
fs.appendFileSync(file,start,function(err){
    if(err){
        console.log(err)
    } else {

    }
})
for(var i = 0; i < length; i++){
    var id = uuid()
    var created_at = new Date().toISOString()
    var end = ','
    if(i == length-1){
        end = ';'
    }
    var content = `测试消息-No.${i}`
    var sql = `('${id}', '${conversation_id}','${user_id}', 'SIGNAL_TEXT', '${content}', NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL, 'READ', '${created_at}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)${end}\n`
    fs.appendFileSync(file,sql,function(err){
        if(err){
            console.log(err)
        } else {
    
        }
    })
}

fs.appendFileSync(file,'COMMIT;',function(err){
    if(err){
        console.log(err)
    } else {

    }
})