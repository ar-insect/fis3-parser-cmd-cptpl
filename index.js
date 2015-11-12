
module.exports = function(content, file, settings) {	
	if(!file.exists()) {
		console.log('file is not exist!');
		return;
	}

    var ln = '\n';

    var ENGINES_MAP = {

        handlebars: function (t) {
            return 'Handlebars.compile(' + t + ');'
        },

        underscore: function (t) {
            return '_.template(' + t + ');'
        }
    };
	
	var def = {
		engine: 'underscore',
		banner: '/**' + ln +
			    '  *copyright: bbs.chelun.com' + ln +
				'  *Author: ar.insect' + ln +
				'  *email:jiangliming@chelun.com' + ln +
				'  */' + ln
	};
	settings = settings || {};
	settings = fis.util.assign(def, settings);
	var start, end;
	var content;
	var dep = '';

    content = content
              .split(ln)
              .map(function (line) {return line.trim()})
              .join('')

	content = ENGINES_MAP[settings.engine.toLowerCase()]('\'' + content
                    .replace(/\"/gi, '\\\"')
                    .replace(/\'/gi, '\\\'')
                    .trim() + '\''
                );

	if (settings.engine === 'underscore') {
		dep = '/**' + ln +
			  '  *@require underscore' + ln +
			  '  */' + ln;
	}

	start = ';define(function(require, exports, module) {' + ln + dep + ln + '    module.exports = ';
	end   = ln + '});';

	content = settings.banner + start + content + end;
	
	return content;
};