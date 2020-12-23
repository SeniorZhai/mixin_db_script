#!/bin/bash
# ./generate.sh 1000 10a3a878-840a-4782-b238-83007957524c c3d57d25-c94d-45e9-8d16-3ddf5a0897e1
if (( $# != 4 )); then
    echo "Illegal number of parameters, ex: insert.sh count conversation-id user-id"
    exit 1
fi

count=$1
conversation_id=$2
user_id=$3
file=$4


echo "BEGIN TRANSACTION;" > $file
echo "INSERT INTO messages (message_id,conversation_id,user_id,category,content,media_url,media_mime_type,media_size,media_duration,media_width,media_height,media_hash,thumb_image,media_key,media_digest,media_status,status,created_at,action,participant_id,snapshot_id,hyperlink,name,album_id,sticker_id,shared_user_id,media_waveform,quote_message_id,quote_content) VALUES" >> $file

for ((i=1;i<=$count;i++))
do
    id=`uuidgen`
    content="No.$i 测试数据"
    created_at=`gdate`
    if(($i == $count))
    then
      echo "('$id', '$conversation_id','$user_id', 'SIGNAL_TEXT', '$content', NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL, 'READ', '$created_at', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);" >> $file
    else
      echo "('$id', '$conversation_id','$user_id', 'SIGNAL_TEXT', '$content', NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL, NULL, NULL, 'READ', '$created_at', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)," >> $file
    fi
done

echo "COMMIT;" >> $file

echo "Finish generate $count data"

./generate.sh 100000 10a3a878-840a-4782-b238-83007957524c 639ec50a-d4f1-4135-8624-3c71189dcdcc 1.sql