'use strict';

angular.module('sbAdminApp')
.service('ArticleService', ['$http', '$resource', '$rootScope', 'Upload', function($http, $resource, $rootScope, Upload) {
	var service = $resource($rootScope.app.WS + '/articles/:param1/:param2', {
		param1 : "@param1",
		param2 : "@param2"
	}, {
		'deleteCover': {
			method: 'DELETE',
			params: {
				param1: 'delete-cover'
			}
		}
	});

	service.uploadCover = function(image, article_id){
		return Upload.upload({
			url: $rootScope.app.WS + '/articles/upload-cover',
			method: 'POST',
			data: {file: Upload.dataUrltoBlob(image), 'article_id': article_id}
		});
	};

	service.coverPath = function (article_id) {
		if (article_id !== undefined) {
			var random = (new Date()).toString();

			return $rootScope.app.WS + '/articles/get-cover/' + article_id + '?cb=' + random;
		}
	}

	return service;
/*
	return $resource($rootScope.app.WS + '/article.svc/:param1:param2', {
		param1 : "@param1",
		param2 : "@param2"
	}, {
		'deleteCover': {
			method: 'DELETE',
			params: {
				param1: "delete-cover"
			}
		}
	});
*/
	/*this.deleteCover = function(article_id){
		console.log('deleteCover');

		return $resource($rootScope.app.WS + '/article.svc/:param1:param2', {
			param1: '@param1',
			param2: '@param2'
		}, {
			method: 'DELETE',
			params: {
				param1: 'delete-cover'
			}
		});
	}*/

	/*this.uploadCover = function(image, article_id){
		console.log("Imagem: ", image);
		console.log("Article id: ", article_id);

		var fd = new FormData();
		fd.append('file', image);
		fd.append('article_id', article_id);

		$http.post($rootScope.app.WS + '/article.svc/upload-cover', fd, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		})
		.success(function(response) {
			console.log('It worked. ', response);
			return response.data;
		})
		.error(function() {
			return null;
		});
	}*/

	/*return $resource($rootScope.app.WS + '/article.svc/:param1:param2', {
		param1 : "@param1",
		param2 : "@param2"
	}, {
		'uploadCover': {
			method: 'POST',
			params: {
				param1: 'upload-cover'
			}
		},
		'deleteCover': {
			method: 'DELETE',
			params: {
				param1: "cover"
			}
		}
	});*/
/*
	var list = [
		{	id: 1,	cover: 'http://lorempixel.com/360/480/abstract',	magazine: 'Fundação Odontológica de Ribeirão Preto',	article: 'Brazilian Dental Journal',			authors: ['A. C. BADINO JR.', 'M. C. R. FACCIOTTI','W. SCHMIDELL'],	editionYear: '2000', editionVolume: '1', editionNumber: '2', uploadDate: '26/10/2015'	},
		{ 	id: 2,	cover: 'http://lorempixel.com/360/480/animals', 	magazine: 'Instituto de Tecnologia do Paraná - Tecpar',	article: 'Arquivos de Biologia e Tecnologia',	authors: ['C.E. Borato', 'P.S.P. Herrmann', 'L.A. Colnago'],		editionYear: '2015', editionVolume: '2', editionNumber: '3', uploadDate: '26/04/2015'	},
		{ 	id: 3, 	cover: 'http://lorempixel.com/360/480/city',	 	magazine: 'Instituto Agronômico de Campinas', 			article: 'Bragantia',							authors: ['R. Folly', 'R. Berlim', 'A. Salgado'],					editionYear: '2010', editionVolume: '3', editionNumber: '4', uploadDate: '10/04/2015'	},
		{	id: 4,	cover: 'http://lorempixel.com/360/480/business',	magazine: 'Fundação Odontológica de Ribeirão Preto',	article: 'Brazilian Dental Journal',			authors: ['A. C. BADINO JR.', 'M. C. R. FACCIOTTI','W. SCHMIDELL'],	editionYear: '2000', editionVolume: '1', editionNumber: '2', uploadDate: '26/10/2015'	},
		{ 	id: 5,	cover: 'http://lorempixel.com/360/480/food',	 	magazine: 'Instituto de Tecnologia do Paraná - Tecpar',	article: 'Arquivos de Biologia e Tecnologia',	authors: ['C.E. Borato', 'P.S.P. Herrmann', 'L.A. Colnago'],		editionYear: '2015', editionVolume: '2', editionNumber: '3', uploadDate: '26/04/2015'	},
		{ 	id: 6, 	cover: 'http://lorempixel.com/360/480/people',		magazine: 'Instituto Agronômico de Campinas', 			article: 'Bragantia',							authors: ['R. Folly', 'R. Berlim', 'A. Salgado'],					editionYear: '2010', editionVolume: '3', editionNumber: '4', uploadDate: '10/04/2015'	},
		{	id: 7,	cover: 'http://lorempixel.com/360/480/transport',	magazine: 'Fundação Odontológica de Ribeirão Preto',	article: 'Brazilian Dental Journal',			authors: ['A. C. BADINO JR.', 'M. C. R. FACCIOTTI','W. SCHMIDELL'],	editionYear: '2000', editionVolume: '1', editionNumber: '2', uploadDate: '26/10/2015'	},
		{ 	id: 8,	cover: 'http://lorempixel.com/360/480/nature',		magazine: 'Instituto de Tecnologia do Paraná - Tecpar',	article: 'Arquivos de Biologia e Tecnologia',	authors: ['C.E. Borato', 'P.S.P. Herrmann', 'L.A. Colnago'],		editionYear: '2015', editionVolume: '2', editionNumber: '3', uploadDate: '26/04/2015'	},
		{ 	id: 9, 	cover: 'http://lorempixel.com/360/480/sports', 		magazine: 'Instituto Agronômico de Campinas', 			article: 'Bragantia',							authors: ['R. Folly', 'R. Berlim', 'A. Salgado'],					editionYear: '2010', editionVolume: '3', editionNumber: '4', uploadDate: '10/04/2015'	},
		{	id: 10,	cover: 'http://lorempixel.com/360/480/abstract',	magazine: 'Fundação Odontológica de Ribeirão Preto',	article: 'Brazilian Dental Journal',			authors: ['A. C. BADINO JR.', 'M. C. R. FACCIOTTI','W. SCHMIDELL'],	editionYear: '2000', editionVolume: '1', editionNumber: '2', uploadDate: '26/10/2015'	},
		{ 	id: 11,	cover: 'http://lorempixel.com/360/480/animals', 	magazine: 'Instituto de Tecnologia do Paraná - Tecpar',	article: 'Arquivos de Biologia e Tecnologia',	authors: ['C.E. Borato', 'P.S.P. Herrmann', 'L.A. Colnago'],		editionYear: '2015', editionVolume: '2', editionNumber: '3', uploadDate: '26/04/2015'	},
		{ 	id: 12, cover: 'http://lorempixel.com/360/480/city',	 	magazine: 'Instituto Agronômico de Campinas', 			article: 'Bragantia',							authors: ['R. Folly', 'R. Berlim', 'A. Salgado'],					editionYear: '2010', editionVolume: '3', editionNumber: '4', uploadDate: '10/04/2015'	},
		{	id: 13,	cover: 'http://lorempixel.com/360/480/business',	magazine: 'Fundação Odontológica de Ribeirão Preto',	article: 'Brazilian Dental Journal',			authors: ['A. C. BADINO JR.', 'M. C. R. FACCIOTTI','W. SCHMIDELL'],	editionYear: '2000', editionVolume: '1', editionNumber: '2', uploadDate: '26/10/2015'	},
		{ 	id: 14,	cover: 'http://lorempixel.com/360/480/food',	 	magazine: 'Instituto de Tecnologia do Paraná - Tecpar',	article: 'Arquivos de Biologia e Tecnologia',	authors: ['C.E. Borato', 'P.S.P. Herrmann', 'L.A. Colnago'],		editionYear: '2015', editionVolume: '2', editionNumber: '3', uploadDate: '26/04/2015'	},
		{ 	id: 15, cover: 'http://lorempixel.com/360/480/people',		magazine: 'Instituto Agronômico de Campinas', 			article: 'Bragantia',							authors: ['R. Folly', 'R. Berlim', 'A. Salgado'],					editionYear: '2010', editionVolume: '3', editionNumber: '4', uploadDate: '10/04/2015'	},
		{	id: 16,	cover: 'http://lorempixel.com/360/480/transport',	magazine: 'Fundação Odontológica de Ribeirão Preto',	article: 'Brazilian Dental Journal',			authors: ['A. C. BADINO JR.', 'M. C. R. FACCIOTTI','W. SCHMIDELL'],	editionYear: '2000', editionVolume: '1', editionNumber: '2', uploadDate: '26/10/2015'	},
		{ 	id: 17,	cover: 'http://lorempixel.com/360/480/nature',		magazine: 'Instituto de Tecnologia do Paraná - Tecpar',	article: 'Arquivos de Biologia e Tecnologia',	authors: ['C.E. Borato', 'P.S.P. Herrmann', 'L.A. Colnago'],		editionYear: '2015', editionVolume: '2', editionNumber: '3', uploadDate: '26/04/2015'	},
		{ 	id: 18, cover: 'http://lorempixel.com/360/480/sports', 		magazine: 'Instituto Agronômico de Campinas', 			article: 'Bragantia',							authors: ['R. Folly', 'R. Berlim', 'A. Salgado'],					editionYear: '2010', editionVolume: '3', editionNumber: '4', uploadDate: '10/04/2015'	}
		];

	this.list = function(query) {
		return angular.copy(list);
	}

	this.listLasts = function() {
		return angular.copy(list);
	}

	this.deleteCover = function(params) {
		return true;
	}*/
}]);