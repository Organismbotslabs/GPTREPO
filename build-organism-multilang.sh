#!/bin/bash

# Build script for multi-language organism runtime
# Builds Java, Python, and other language components

set -e

echo "╔════════════════════════════════════════════════╗"
echo "║   MULTI-LANGUAGE ORGANISM BUILD                ║"
echo "║   Java → Python → TypeScript → All             ║"
echo "╚════════════════════════════════════════════════╝"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build Python organism
echo -e "${BLUE}[1/4]${NC} Building Python organism..."
cd organism/python
python3 -m pip install -e . --user || echo -e "${YELLOW}Warning: Python install had issues${NC}"
cd ../..

# Build Java organism
echo -e "${BLUE}[2/4]${NC} Building Java organism..."
cd organism/java
mvn clean package -DskipTests || echo -e "${YELLOW}Warning: Java build had issues${NC}"
cd ../..

# Build TypeScript organism (if available)
if [ -d "organism/typescript" ]; then
    echo -e "${BLUE}[3/4]${NC} Building TypeScript organism..."
    cd organism/typescript
    npm install || echo -e "${YELLOW}Warning: TypeScript install had issues${NC}"
    npm run build || echo -e "${YELLOW}Warning: TypeScript build had issues${NC}"
    cd ../..
else
    echo -e "${YELLOW}[3/4] TypeScript organism not found, skipping${NC}"
fi

# Build web components
echo -e "${BLUE}[4/4]${NC} Building web organism components..."
if [ -d "organism/web" ]; then
    echo "Web components found"
else
    echo -e "${YELLOW}Web components not found, skipping${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   MULTI-LANGUAGE BUILD COMPLETE                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
echo ""
echo "To run the Java organism with Python nervous system:"
echo "  cd organism/java && java -jar target/organism-runtime-1.0.0.jar"
echo ""
echo "To run the Python organism standalone:"
echo "  python3 -m organism"
echo ""
