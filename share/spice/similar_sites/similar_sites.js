(function(env) {

    env.ddg_spice_similar_sites = function(api_result) {

        var script = $('[src*="/js/spice/similar_sites/"]')[0],
                source = $(script).attr("src"),
                query = source.match(/similar_sites\/([^\/]+)/)[1];

        if(!api_result || api_result.num === 0 || api_result.status !== 'ok') {
            return Spice.failed('similar_sites');
        }

        var num = api_result.num;
        var show_more = true;
        if (num < 5)
            show_more = false;

        Spice.add({
            id: 'similar_sites',
            name: 'Similar Sites',

            data: {
                results: api_result,
                num: num,
                show_more: show_more,
                more_at: query
            },

            normalize: function (data) {
                var sites = [];

                for (var i = 0; i < data.num; i++) {
                    var url = data.results['r' + i];
                    sites.push({
                        url: url,
                        name: url.replace("http://", "")
                                                   .replace("https://", "")
                                                   .replace("www.", "")
                                                   .replace(/\/+$/g, '')
                    });
                };
                console.log(sites);

                return {
                    title: 'Websites similar to ' + query,
                    sites: sites
                }
            },

            meta: {
                total: num,
                sourceName: 'SimilarSites',
                sourceUrl: 'http://www.similarsites.com/site/' + query,
                sourceIcon: true,
                itemType: 'Similar Sites'
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.similar_sites.content,
                    moreAt: true
                }
            },

            onShow: function() {
                var toggle = false;
                var $icon = $(".zci--similar_sites .chomp--link__icn");
                $icon.attr('data-content', "+");

                var $more = $(".zci--similar_sites .chomp--link__mr");
                var $less = $(".zci--similar_sites .chomp--link__ls");

                $("#show_more").click(function() {
                    $more.toggle();
                    $less.toggle();
                    $("#hidden").toggle();

                    if(toggle) {
                        $icon.attr('data-content', "+");
                        toggle = false;
                    } else {
                        $icon.attr('data-content', "-");
                        toggle = true;
                    }
                });
            }
        });
    };

})(this);
