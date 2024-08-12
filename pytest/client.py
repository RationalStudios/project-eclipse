import socket
import struct
from zlib import compress
import easygui

from mss import mss
from converter import int2str,str2int


WIDTH = 1900
HEIGHT = 1000


def retreive_screenshot(conn):
    with mss() as sct:
        # The region to capture
        rect = {'top': 0, 'left': 0, 'width': WIDTH, 'height': HEIGHT}

        while 'recording':
            # Capture the screen
            img = sct.grab(rect)
            # Tweak the compression level here (0-9)
            pixels = compress(img.rgb, 6)

            # Send the size of the pixels length
            size = len(pixels)
            size_len = (size.bit_length() + 7) // 8
            conn.send(bytes([size_len]))

            # Send the actual pixels length
            size_bytes = size.to_bytes(size_len, 'big')
            conn.send(size_bytes)

            # Send pixels
            conn.sendall(pixels)

def main(host='24.2.138.255', port=5000):
    
    sock = socket.socket()
    sock.connect((host, port))

    try:
        print('Client Start.')

        retreive_screenshot(sock)
    finally:
        sock.close()


def ip2hash(addr):
    return int2str(struct.unpack("!I", socket.inet_aton(addr))[0],64)

def hash2ip(addr):
    return socket.inet_ntoa(struct.pack("!I", str2int(addr, 64)))

# localhost is 
print("Localhost ip is " + ip2hash("127.0.0.1"))
if __name__ == '__main__':
    iphash = easygui.enterbox("Enter IDIP of your VR.")
    if iphash != None:
        main(hash2ip(iphash))