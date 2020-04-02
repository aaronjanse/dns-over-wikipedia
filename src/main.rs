#[macro_use] extern crate nickel;

use nickel::Nickel;
use nickel::status::StatusCode;
use nickel::hyper::header::{Host, Location};

mod wikipedia;

fn main() {
    let mut server = Nickel::new();

    server.utilize(router! {
        get "**" => |req, mut res| {
            let headers = &req.origin.headers;
            let hostname = &headers.get::<Host>().unwrap().hostname;

            let page_name = hostname.split(".").next().unwrap();

            let target_site = wikipedia::search_page_url(page_name).unwrap();

            res.set(StatusCode::TemporaryRedirect)
               .set(Location(target_site.into()));

            ""
        }
    });

    // This way if the port can't bind the application will panic instead of silently erroring.
    server.listen("127.0.0.1:80").unwrap();
}
