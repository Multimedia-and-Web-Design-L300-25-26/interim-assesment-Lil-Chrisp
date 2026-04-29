# Render Backend Deploy - No Crypto

## Steps:
1. git add .
2. git commit -m "No crypto data"
3. git push origin main
4. Render Dashboard → Manual Deploy → Clear cache & deploy latest commit
5. Test: /crypto/gainers → count:0

## Verify Render running latest:
- Logs show your latest commit hash
- /health
- /crypto/gainers

Frontend Netlify uses this backend URL.
