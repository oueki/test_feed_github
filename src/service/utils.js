export const modifymessage = (feed) => {

	const data = feed.payload;
	let mesg = {};

      if (data.issue) {
        mesg.title = feed.repo.name + "#" + data.issue.number;
        mesg.link = data.issue.html_url;
        if(data.comment){
        	mesg.msg = data.comment.body;
        }else{
        	mesg.action  = data.action;
        	mesg.msg = data.issue.title;
        }

      }

      if (data.commits) {

		if (data.ref.substring(0, 11) === 'refs/heads/') {
          mesg.title = data.ref.substring(11);
        } else {
          mesg.title = data.ref;
        }	
      	mesg.msg = data.commits[0].message;
      	mesg.link = `https://github.com/${feed.repo.name}/commit/${data.commits[0].sha}`;
      }

      if (data.pull_request) {
      	mesg.link = data.pull_request.html_url;
      	mesg.msg = data.pull_request.title;
      	mesg.action  = data.action;
      	mesg.title = feed.repo.name + "#" + data.number;
      }

      if (data.comment && !data.issue) {
      	mesg.link = data.comment.html_url;
      	mesg.msg = data.comment.body;
      	mesg.title = feed.repo.name + "@" + data.comment.commit_id;
      }


	return mesg

};