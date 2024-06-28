export parseExpr = (expr) ->
	if expr.startsWith('(') and expr.endsWith(')') then expr = expr.slice 1, -1
	parts = splitByTopLevelPipe expr
	parts.map (part) -> if part.startsWith('(') and part.endsWith(')') then parseExpr part else part

splitByTopLevelPipe = (expr) ->
	parts = []
	part = ''
	level = 0
	for char, i in expr
		if char == '(' then level++
		else if char == ')'then level--
		if char == '|' and level == 0
			parts.push part
			part = ''
		else part += char
	parts.push part if part
	parts
