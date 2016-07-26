;(function() {
    'use strict';

    angular
        .module('mock')
        .run(run);

    /* ngInject */
    function run($httpBackend, API_URL) {
        var mockModel = {};

        //Auth
        //Sign-in
        $httpBackend
            .when('POST', API_URL + 'auth/local')
            .respond(function(method, url, data) {
                var dataObj = JSON.parse(data);
                if (dataObj.email && dataObj.password) {
                    return [200, {token: '...some-kind-of-token...'}, {}];
                } else {
                    return [400, {message: 'Email or password is not correct...'}, {}];
                }
            });

        //Sign-up
        $httpBackend
            .when('POST', API_URL + 'auth/register')
            .respond(function(method, url, data) {
                var dataObj = JSON.parse(data);
                console.log(data);
                if (dataObj.email && dataObj.password) {
                    mockModel.user = data;
                    return [200, {token: '...some-kind-of-token...'}, {}];
                } else {
                    return [400, {message: 'Email and password should be empty...'}, {}];
                }
            });

        //Internal
        //Projects
        $httpBackend
            .when('GET', API_URL + 'queries/researches')
            .respond(function(method, url, data) {
                if (mockModel.user) {
                    return [200, {"researches": [{"status": "active", "supervisor": {"status": "ACTIVE", "supervisor_in": 1, "created_forums": 2, "researcher_in": 0, "posted_messages": 1, "id": 5629499534213120, "email": "tassadar.ha@gmail.com", "name": "Sergey Shelpuk"}, "description": {"detailed": "<p>Poznan University of Technology announced&nbsp;Visual Doom AI Competition with the goal of building AI agent for Doom based on screen images only. Let's give it a try!</p>", "brief": "Let's build an agent for Visual Doom AI Competition\nhttp://vizdoom.cs.put.edu.pl/competition-cig-2016"}, "area": "test area", "title": "Doom Competition", "created": "2016-06-30 18:58:58", "image_url": "http://storage.googleapis.com/images.szkocka.org/a0814ac7-3ef4-11e6-b88f-4388c8c43964.jpg", "researchers": [{"status": "ACTIVE", "supervisor_in": 0, "created_forums": 0, "researcher_in": 1, "posted_messages": 0, "id": 5710239819104256, "email": "anastasiya.mishchuk@gmail.com", "name": "Anastasiia Mishchuk"}], "relationship_type": "NONE", "id": 5749328048029696, "tags": ["computer vision", "machine learning", "artificial intelligence"]}, {"status": "active", "supervisor": {"status": "ACTIVE", "supervisor_in": 2, "created_forums": 3, "researcher_in": 0, "posted_messages": 1, "id": 5649391675244544, "email": "ducha.aiki@gmail.com", "name": "Dmytro"}, "description": {"detailed": "List of participants:<br />- https://www.facebook.com/anastasiya.mishchuk<br />- https://www.facebook.com/annavergeles<br />- https://www.facebook.com/serhiy.semenyuk<br />- https://www.facebook.com/denis.morgun.5<br />- https://www.facebook.com/mvtkachuk?fref=ufi<br /><br />Literature:<br />1)Training Deep Nets<br />- &nbsp;http://www.cs.toronto.edu/~fritz/absps/imagenet.pdf How to train deep net, basics<br />- http://yann.lecun.com/exdb/publis/pdf/chopra-05.pdf Siamese architecture<br />- http://infoscience.epfl.ch/record/217963/files/1204.pdf somewhat similar to what we going to do.<br />- http://arxiv.org/pdf/1511.06078v2.pdf - very close to what we going to do, except &ldquo;map&rdquo; instead of text.<br />http://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Lin_Learning_Deep_Representations_2015_CVPR_paper.pdf - very relevant as well<br />http://cs231n.stanford.edu/ - Very nice course about convolutional networks -&nbsp;<br />- (http://academictorrents.com/details/46c5af9e2075d9af06f280b55b65cf9b44eb9fe7)<br /><br />http://www.deeplearningbook.org/ - good reference book, not tutorial<br /><br />2) Image search by deep nets<br />https://arxiv.org/abs/1404.1777 Basic implementation<br />3)How navigation and place recognition in similar case (not limited to UAV) is done now:<br />http://rpg.ifi.uzh.ch/docs/JFR15_Majdik.pdf&nbsp;<br />http://rpg.ifi.uzh.ch/docs/ICRA14_Majdik.pdf<br />https://pdfs.semanticscholar.org/b993/702c93f93632775c910a3ea9e69d7d7489da.pdf&nbsp;<br />http://publications.rwth-aachen.de/record/444921/files/5031.pdf<br />https://www.graphics.rwth-aachen.de/publication/213/ECCV14_preprint_0XcmhCx.pdf<br />http://www.di.ens.fr/~josef/publications/Torii15.pdf<br /><br />Datasets and raw data:<br />- OpenstreetMap http://wiki.openstreetmap.org/wiki/Downloading_data<br />- http://www.pancroma.com/data.html&nbsp;<br /><br />Useful libaries:<br />- https://github.com/BVLC/caffe&nbsp;<br />- https://www.tensorflow.org/<br />- http://opencv.org/ OpenCV&nbsp;<br />- http://lasagne.readthedocs.io/en/latest/user/installation.html&nbsp;", "brief": "Teach UAV to recognize its location using on-board camera and satellite map."}, "area": "test area", "title": "UAV multimodal navigation", "created": "2016-06-16 07:39:15", "image_url": "http://images.szkocka.org/default.jpg", "researchers": [{"status": "ACTIVE", "supervisor_in": 0, "created_forums": 0, "researcher_in": 1, "posted_messages": 0, "id": 5668600916475904, "email": "semenyuk@gmail.com", "name": "ssemenyuk"}], "relationship_type": "NONE", "id": 5672749318012928, "tags": ["uav", "CNN"]}, {"status": "active", "supervisor": {"status": "ACTIVE", "supervisor_in": 2, "created_forums": 3, "researcher_in": 0, "posted_messages": 1, "id": 5649391675244544, "email": "ducha.aiki@gmail.com", "name": "Dmytro"}, "description": {"detailed": "<p></p>List of participants:&nbsp;<br />- https://www.facebook.com/bogdan.kulynych<br />- https://www.facebook.com/i.vatrushechka<br />- https://www.facebook.com/andrii.shevchenko.35?fref=ufi<br />- https://www.facebook.com/kirillface?fref=ufi<br />- https://www.facebook.com/mishmetall<br /><br />Literature:<br />&nbsp;1)Training Deep Nets&nbsp;<br />http://www.cs.toronto.edu/~fritz/absps/imagenet.pdf How to train deep net, basics -http://yann.lecun.com/exdb/publis/pdf/chopra-05.pdf Siamese architecture&nbsp;<br /><br />http://cs231n.stanford.edu/ - Very nice course about convolutional networks http://www.deeplearningbook.org/ - good reference book, not tutorial &nbsp;<br />http://arxiv.org/abs/1406.6909 - similar, but &ldquo;opposite&rdquo; approach<br />http://arxiv.org/abs/1511.06434 , http://arxiv.org/abs/1406.2661 adversarial learning<br />http://arxiv.org/pdf/1511.04587v1.pdf - super resolution,<br />http://beta.openreview.net/pdf?id=E8VEozRYyi31v0m2iDwy DEEP AUTORESOLUTION NETWORKS &nbsp;Additional very relevant paper&nbsp;<br /><br />http://www.fit.vutbr.cz/~ihradis/pubs.php?file=%2Fpub%2F10922%2Fhradis15CNNdeblurring.pdf&amp;id=10922 - text deblurring<br />Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network - MagicPony paper, not yet available<br /><br />Datasets and raw data:<br />- https://cs.stanford.edu/~acoates/stl10/<br />- basically, any set of images<br /><br /><br />&nbsp;Useful libaries:&nbsp;<br />- https://github.com/BVLC/caffe &nbsp;<br />- https://www.tensorflow.org/&nbsp;<br />- http://opencv.org/ OpenCV &nbsp;<br />- http://lasagne.readthedocs.io/en/latest/user/installation.html #unsupervisednoise &nbsp;, #literature, #dataset, #software<p></p>", "brief": "Learn visual features in unsupervised way, classifying and canceling image perturbations. Could be useful as image representation and de-noising tool"}, "area": "test area", "title": "Unsupervised learning by noising/de-noising", "created": "2016-06-13 07:38:50", "image_url": "http://images.szkocka.org/default.jpg", "researchers": [{"status": "ACTIVE", "supervisor_in": 0, "created_forums": 0, "researcher_in": 1, "posted_messages": 0, "id": 5654313976201216, "email": "mshakuznetsov@gmail.com", "name": "Mykhailo Kuznietsov"}, {"status": "ACTIVE", "supervisor_in": 0, "created_forums": 0, "researcher_in": 1, "posted_messages": 0, "id": 5715999101812736, "email": "bogdan.kulynych@gmail.com", "name": "Bogdan Kulynych"}], "relationship_type": "NONE", "id": 5639445604728832, "tags": ["test"]}]}, {}];
                } else {
                    return [401, {message: 'You don`t have access to see that content...'}, {}];
                }
            });
    }
})();