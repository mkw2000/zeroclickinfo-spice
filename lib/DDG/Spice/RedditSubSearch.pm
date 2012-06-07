package DDG::Spice::RedditSubSearch;

use DDG::Spice;

triggers query_lc => qr#^(?:subreddit|/?r/)\s*(\w+)$#i;
spice to => 'http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit';

handle matches => sub {
    return $_[0]
};

1;
