module.exports = function({types: t}) {
    return {
      visitor: {
        //   BinaryExpression(path) {
        //     path.replaceWith(
        //       t.binaryExpression("**", path.node.left, t.numericLiteral(2))
        //     );
        //     path.skip()
        //   },
        //   ReturnStatement(path) {
        //     path.replaceWithMultiple([
        //       t.expressionStatement(t.stringLiteral("Is this the real life?")),
        //       t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
        //       t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
        //     ]);
        //   },
        //   FunctionDeclaration(path) {
        //       path.replaceWithSourceString('function(a,b) {return a + b;}')
        //   }
        FunctionDeclaration(path) {
            path.insertBefore(t.expressionStatement(t.stringLiteral('Because I\'m easy come, easy go.')))
            path.insertAfter(t.expressionStatement(t.stringLiteral('A little high, little low.')))
        }

      }
    };
  }