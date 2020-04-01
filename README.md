# DNS over Wikipedia

## Installation Instructions
### 1. Install dnsmasq
#### Linux:
```
sudo apt install dnsmasq
```

#### macOS:
```bash
brew install dnsmasq
```

### 2. Configure dnsmasq
#### Linux:
Add the following to your `dnsmasq.conf`:
```
address=/idk/127.0.0.1
```

#### macOS:
```bash
echo "address=/.idk/127.0.0.1" >> "$(brew --prefix)/etc/dnsmasq.conf"
sudo brew services start dnsmasq
```

### 3. Use dnsmasq to resolve queries
#### Linux:
I believe the typical installation on linux handles this.

#### macOS:
```bash
sudo mkdir -p /etc/resolver
sudo tee -a /etc/resolver/idk > /dev/null << EOF
nameserver 127.0.0.1
EOF
```
