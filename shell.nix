with import <nixpkgs> {};

mkShell {
  name = "dns-over-wikipedia";
  buildInputs = [ rustup openssl pkgconfig ];
}
