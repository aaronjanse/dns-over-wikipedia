#[macro_use] extern crate nickel;

use crate::nickel::extensions::Referer;
use crate::nickel::QueryString;
use nickel::Nickel;
use nickel::hyper::header;


fn main() {
    let mut server = Nickel::new();

    server.utilize(router! {
        get "**" => |req, _res| {
          let headers = &req.origin.headers;
          let hostname = &headers.get::<header::Host>().unwrap().hostname;
          println!("{}", hostname);
          "Hello world!"
        }
    });

    server.listen("127.0.0.1:80");
}
