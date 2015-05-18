#!/usr/bin/env node

var fs = require('fs');


var url = 'https://www.gcloudbackup.com/Account/DownloadFile.aspx?DownloadFile=1';
var cookie = 'Cookie: SelectedDevice=YRazyERLnvi3Z9s+qWLbWA==; __qca=P0-515159503-1430955355924; ASP.NET_SessionId=ordq1qsx5maozraz3bynooxg; isZoolzAdds=true; AWSELB=A1C1DD591205A4900B8319AF804A86196F0DC7EE3633376EF3DF53953ECD23D861C699E95F32E7FC7A808B99F9A8D41C885F9B2F8B0F44A9FA218A0A9130624EC9E5D8245E; Client=mN1d1oZ12y0yz/tRvZO/iSPVW/re13Wc2f/LODmVjsFa0Sa4q7hhFT466YeOuV5RHKcEEquHtg08ToUymOiJRFwoke3ar9WNW495jkfihIYKfapkmbsY4z0CRlaTqF5FZFvXH7X7daU=; __ar_v4=PCUUGZ627RFV7LBA55V5WR%3A20150505%3A6%7CWWYHRJMLDNFC3AQRJJKVZZ%3A20150505%3A6%7CYDWN2TZA2NDEPB4RS76UFD%3A20150505%3A6; __utma=235770263.370774561.1430834446.1431974438.1431987188.9; __utmb=235770263.2.10.1431987189; __utmc=235770263; __utmz=235770263.1430834446.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); FilePath=njkBR/l52Z+ph/Pg5Y9i1seaLDechTQQEXY6+3xCnoCo/0fGJPnNbKRAW7+2BP28GMAUlj8xK/k=';

var downloadLocation = '~/Downloads/gclouddownload';


/*
{ FileID: '20150511_094716.jpg*M1431362836000*S4266120',
  FileName: '20150511_094716.jpg',
  FileName64: 'MjAxNTA1MTFfMDk0NzE2LmpwZw==',
  FilePath: '1/50/dcim/camera/20150511_094716.jpg*M1431362836000*S4266120',
  Size: 4266120,
  FormattedSize: '4.07 MB',
  IsFolder: false,
  ModificationDate: 'May 11, 2015',
  ModificationDateSort: 1431362836000,
  BackupDate: '',
  DateModificationUTC: '1431362836000',
  BackupDateUTC: '',
  FileType: 2,
  RootFolderFlag: 1,
  ThumbURL: 'https://www.gcloudbackup.com/ImageNew?Key=MSUyRjUwJTJGZGNpbSUyRmNhbWVyYSUyRjIwMTUwNTExXzA5NDcxNi5qcGcqTTE0MzEzNjI4MzYwMDAqUzQyNjYxMjA=&Type=s&UserID=1504108&selectedDevice=1640256' }
*/

// curl 'https://www.gcloudbackup.com/Account/DownloadFile.aspx?DownloadFile=1' -H 'Cookie: SelectedDevice=YRazyERLnvi3Z9s+qWLbWA==; __qca=P0-515159503-1430955355924; AWSELB=A1C1DD591205A4900B8319AF804A86196F0DC7EE363CE99C6919C967D0EC335D55C661EEB1467F474900295C757CD6C280CC11066FADB671A8255555C9A2CA10D3E5398666; __ar_v4=YDWN2TZA2NDEPB4RS76UFD%3A20150505%3A5%7CWWYHRJMLDNFC3AQRJJKVZZ%3A20150505%3A5%7CPCUUGZ627RFV7LBA55V5WR%3A20150505%3A5; ASP.NET_SessionId=ordq1qsx5maozraz3bynooxg; Client=mN1d1oZ12y0yz/tRvZO/iSPVW/re13Wc2f/LODmVjsFa0Sa4q7hhFT466YeOuV5RHKcEEquHtg08ToUymOiJRFwoke3ar9WNW495jkfihIYKfapkmbsY4z0CRlaTqF5FZFvXH7X7daU=; __utma=235770263.370774561.1430834446.1431645992.1431961062.7; __utmb=235770263.2.10.1431961064; __utmc=235770263; __utmz=235770263.1430834446.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); isZoolzAdds=true; FilePath=njkBR/l52Z+ph/Pg5Y9i1seaLDechTQQEXY6+3xCnoCo/0fGJPnNbKRAW7+2BP28GMAUlj8xK/k=' -H 'Origin: https://www.gcloudbackup.com' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Referer: https://www.gcloudbackup.com/Account/MyDevices' -H 'Connection: keep-alive' --data 'FilePath=1%2F50%2Fdcim%2Fcamera%2F20150511_094716.jpg*M1431362836000*S4266120&fileSize=4266120&ModificationDate=1431362836000&fileName=20150511_094716.jpg&IsFolder=false&type=&timeZone=-420&selectedDevice=1640256&flags=1&InternalExternalMarker=False&UserId=1504108' --compressed

function buildFormDataFromLine(line) {
    var formData = 'FilePath='+encodeURIComponent(line.FilePath)+'&fileSize='+line.Size+'&ModificationDate='+line.DateModificationUTC+'&fileName='+line.FileName+'&IsFolder='+line.IsFolder+'&type=&timeZone=-420&selectedDevice=1640256&flags=1&InternalExternalMarker=False&UserId=1504108';
    return formData;
}

function outputFilePath(line) {
    var rawFilePath = line.FilePath; // /path/to/file20150511_094716.jpg*M1431362836000*S4266120
    var fileName = line.FileName;
    // TODO: This needs to be sorted.
    return downloadLocation + '/' + fileName;
}

function processJSONFile(jsonFile) {
    var obj = JSON.parse(fs.readFileSync('img.json', 'utf8'));
    for (var i=0; i<1; i++) {
        var line = obj[i];
        var formData = buildFormDataFromLine(line);
        var out = outputFilePath(line);
        if (!fs.existsSync(out)) {
            var command = "curl '" + url + "' -H '"+cookie+"' -H 'Origin: https://www.gcloudbackup.com' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Referer: https://www.gcloudbackup.com/Account/MyDevices' -H 'Connection: keep-alive' --data '" + formData + "' --compressed -o " + out;
            console.log(command);
        } else {
            // File exists, so skip
        }
    }
}

for (var j=2; j<process.argv.length; j++) {
    var jsonFile = process.argv[j];
    processJSONFile(jsonFile);
}
