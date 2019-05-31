const fs = require("fs");
const uuid = require("uuid/v1");
const shell = require("shelljs");

const file = "new.sql";
const step = 20000;

var count = process.argv[2];
var conversation_id = process.argv[3];
if (conversation_id == null) {
  conversation_id = "10a3a878-840a-4782-b238-83007957524c";
}

var user_id1 = process.argv[4];
if (user_id1 == null) {
  user_id1 = "639ec50a-d4f1-4135-8624-3c71189dcdcc";
}

var user_id2 = process.argv[5];
if (user_id2 == null) {
  user_id2 = "4e0e6e6b-6c9d-4e99-b7f1-1356322abec3";
}

console.log(`start insert ${count} message...`);

shell.exec("pull-db.sh");

console.log(`pull db success...`);

var index = 1;
function gen(length) {
  fs.unlink(file, function(err) {
    if (err) {
      console.log(err);
    } else {
      // console.log('delete sql script!!!')
    }
  });

  console.log(new Date());
  var start = `BEGIN TRANSACTION;
DROP TRIGGER IF EXISTS conversation_last_message_update;
DROP TRIGGER IF EXISTS conversation_last_message_delete;
DROP TRIGGER IF EXISTS conversation_unseen_message_count_insert;
INSERT INTO messages (id,conversation_id,user_id,category,content,media_url,media_mime_type,media_size,media_duration,media_width,media_height,media_hash,thumb_image,media_key,media_digest,media_status,status,created_at,action,participant_id,snapshot_id,hyperlink,name,album_id,sticker_id,shared_user_id,media_waveform,media_mine_type,quote_message_id,quote_content) VALUES \n`;
  fs.appendFileSync(file, start, function(err) {
    if (err) {
      console.log(err);
    } else {
    }
  });

  for (var i = 0; i < length; i++) {
    var id = uuid();
    var created_at = new Date().toISOString();
    var end = ",";
    if (i == length - 1) {
      end = ";";
    }
    var content = `Test ☺No.${index++}`;
    var user_id = user_id1;
    if (i % 2 == 0) {
      user_id = user_id2;
    }
    var sql = `('${id}', '${conversation_id}','${user_id}', 'SIGNAL_TEXT', '${content}', NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL, 'READ', '${created_at}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)${end}\n`;
    fs.appendFileSync(file, sql, function(err) {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }
  var end = `CREATE TRIGGER conversation_last_message_update AFTER INSERT ON messages BEGIN UPDATE conversations SET last_message_id = new.id WHERE conversation_id = new.conversation_id; END;
CREATE TRIGGER conversation_last_message_delete AFTER DELETE ON messages BEGIN UPDATE conversations SET last_message_id = (select id from messages where conversation_id = old.conversation_id order by created_at DESC limit 1) WHERE conversation_id = old.conversation_id; END;
CREATE TRIGGER conversation_unseen_message_count_insert AFTER INSERT ON messages BEGIN UPDATE conversations SET unseen_message_count = (SELECT count(m.id) FROM messages m, users u WHERE m.user_id = u.user_id AND u.relationship != 'ME' AND m.status = 'DELIVERED' AND conversation_id = new.conversation_id) where conversation_id = new.conversation_id; END;
COMMIT;`;
  fs.appendFileSync(file, end, function(err) {
    if (err) {
      console.log(err);
    } else {
    }
  });

  console.log(`Begin insert ${index}`);
  shell.exec(`sqlite3 mixin.db < ${file}`);
  console.log("End insert");
  shell.exec("check-db.sh");
}

do {
  if (count > step) {
    gen(step);
    count = count - step;
  } else {
    gen(count);
    count = 0;
  }
} while (count > 0);
